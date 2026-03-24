import { useState, useEffect } from 'react'

export function useUserLocation() {
  const [city, setCity] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [permissionDenied, setPermissionDenied] = useState(false)

  useEffect(() => {
    const storedCity = localStorage.getItem('orma_city')
    const denied = localStorage.getItem('orma_location_denied')

    if (storedCity) {
      setCity(storedCity)
      setLoading(false)
      return
    }

    if (denied === 'true') {
      setPermissionDenied(true)
      setLoading(false)
      return
    }

    const shouldAsk = localStorage.getItem('orma_location_prompted') !== 'true'
    if (shouldAsk) {
      requestLocation()
    } else {
      setLoading(false)
    }
  }, [])

  const requestLocation = () => {
    setLoading(true)
    setError(null)
    localStorage.setItem('orma_location_prompted', 'true')

    const allowed = window.confirm('ORMA wants to know your location to show nearby rentals')
    if (!allowed) {
      localStorage.setItem('orma_location_denied', 'true')
      setPermissionDenied(true)
      setLoading(false)
      return
    }

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2`
          )
          
          if (!response.ok) throw new Error('Network response was not ok')
            
          const data = await response.json()
          
          // Nominatim may return city, town, or village
          const detectedCity = data.address?.city || data.address?.town || data.address?.state_district || null
          
          if (detectedCity) {
            setCity(detectedCity)
            localStorage.setItem('orma_city', detectedCity)
            localStorage.removeItem('orma_location_denied')
            setPermissionDenied(false)
          } else {
            setError('Could not detect city from location')
          }
        } catch (err) {
          console.error('Error fetching location data', err)
          setError('Failed to reverse geocode location')
        } finally {
          setLoading(false)
        }
      },
      (geoError) => {
        console.warn('Geolocation error:', geoError.message)
        localStorage.setItem('orma_location_denied', 'true')
        setPermissionDenied(true)
        setError(geoError.message)
        setLoading(false)
      },
      { timeout: 10000 }
    )
  }

  const setManualCity = (newCity: string) => {
    const trimmed = newCity.trim()
    if (!trimmed) {
      setCity(null)
      localStorage.removeItem('orma_city')
      return
    }
    setCity(trimmed)
    localStorage.setItem('orma_city', trimmed)
    localStorage.removeItem('orma_location_denied') // They chose a city, so we don't need to ask again
    setPermissionDenied(false)
  }

  return { city, loading, error, permissionDenied, requestLocation, setManualCity }
}
