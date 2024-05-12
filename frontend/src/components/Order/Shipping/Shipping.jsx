import Home from '@mui/icons-material/Home'
import Location from '@mui/icons-material/LocationCity'
import Phone from '@mui/icons-material/Phone'
import Pin from '@mui/icons-material/PinDrop'
import Public from '@mui/icons-material/Public'
import Transfer from '@mui/icons-material/TransferWithinAStation'
import { Country, State } from "country-state-city"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useErrors from '../../../hooks/useErrors'
import useMutation from '../../../hooks/useMutation'
import { useGetShipInfoQuery, useUpdateShipMutation } from '../../../redux/api/user'
import Loader from '../../Loader/Loader'
import MetaData from '../../MetaData'
import CheckoutSteps from '../CheckoutSteps'
import toast from 'react-hot-toast'
import './Shipping.css'

const Shipping = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  const navigate = useNavigate()
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [pincode, setPincode] = useState('')
  const [phone, setPhone] = useState('')
  const [updateShip] = useMutation(useUpdateShipMutation)
  const formSubmit = async e => {
    e.preventDefault()
    if (phone.length < 10 || phone.length > 10) return toast.error('Phone No. must be of 10 digits')
    if (pincode.length < 6 || pincode.length > 6) return toast.error('Pincode must be of 6 digits')
    toast.dismiss()
    await updateShip('Updating Address...', { address, city, state, country, pincode, phone })
    navigate('/confirmorder')
  }
  const { isLoading, data, isError, error } = useGetShipInfoQuery()
  useErrors([{ error, isError }])
  useEffect(() => {
    if (data) {
      setAddress(data.shipInfo.address)
      setCity(data.shipInfo.city)
      setState(data.shipInfo.state)
      setCountry(data.shipInfo.country)
      setPincode(data.shipInfo.pincode)
      setPhone(data.shipInfo.phone)
    }
  }, [data])
  return (
    <>
      {isLoading ? <Loader /> : <>
        <MetaData title={`SHIPPING DETAILS`} />
        <CheckoutSteps activeStep={0} />
        <div className="shipping">
          <div className="shippingBox">
            <h2 className="shippingHeading">
              Shipping Details
            </h2>
            <form className="shippingForm" onSubmit={formSubmit}>
              <div className="">
                <Home />
                <input type="text" placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} required />
              </div>
              <div className="">
                <Location />
                <input type="text" placeholder='City/Town/Village' value={city} onChange={e => setCity(e.target.value)} required />
              </div>
              <div className="">
                <Pin />
                <input type="number" placeholder='Pin Code' value={pincode} onChange={e => setPincode(e.target.value)} required />
              </div>
              <div className="">
                <Phone />
                <input type="number" placeholder='Phone No.' value={phone} onChange={e => setPhone(e.target.value)} required />
              </div>
              <div className="">
                <Public />
                <select value={country} onChange={e => setCountry(e.target.value)} required>
                  <option value="">
                    Country
                  </option>
                  {Country && Country.getAllCountries().map(country => {
                    return (
                      <option value={country.isoCode} key={country.isoCode}>
                        {country.name}
                      </option>
                    )
                  })}
                </select>
              </div>
              {country && (
                <div className="">
                  <Transfer />
                  <select value={state} onChange={e => setState(e.target.value)}>
                    <option value="">
                      State
                    </option>
                    {State && State.getStatesOfCountry(country).map(state => {
                      return (
                        <option value={state.isoCode} key={state.isoCode}>
                          {state.name}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )}
              <input type="submit" value="Continue" className='shippingBtn' disabled={!state} />
            </form>
          </div>
        </div>
      </>}
    </>
  )
}

export default Shipping