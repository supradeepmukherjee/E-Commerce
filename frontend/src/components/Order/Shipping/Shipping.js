import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Pin from '@mui/icons-material/PinDrop'
import Home from '@mui/icons-material/Home'
import Location from '@mui/icons-material/LocationCity'
import Public from '@mui/icons-material/Public'
import Phone from '@mui/icons-material/Phone'
import Transfer from '@mui/icons-material/TransferWithinAStation'
import { Country, State } from "country-state-city";
import alert from '../../../alert'
import Alert from '../../Alert'
import './Shipping.css'
import MetaData from '../../MetaData'
import CheckoutSteps from '../CheckoutSteps'
import { useNavigate } from 'react-router-dom'
import { getShipInfo, saveShipInfo } from '../../../Actions/User'
import Loader from '../../Loader/Loader'

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shipInfo, error, loading } = useSelector(state => state.ship)
  const [alertVisibility, setAlertVisibility] = useState('hidden')
  const [alertMsg, setAlertMsg] = useState('')
  const [alertType, setAlertType] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [country, setCountry] = useState('')
  const [pincode, setPincode] = useState('')
  const [phone, setPhone] = useState('')
  const formSubmit = async e => {
    e.preventDefault()
    if (phone.length < 10 || phone.length > 10) {
      return alert('error', setAlertType, 'Phone No. must be of 10 digits', setAlertMsg, setAlertVisibility, dispatch)
    }
    if (pincode.length < 6 || pincode.length > 6) {
      return alert('error', setAlertType, 'Pincode must be of 6 digits', setAlertMsg, setAlertVisibility, dispatch)
    }
    await dispatch(saveShipInfo(address, city, state, country, pincode, phone))
    navigate('/confirmorder')
  }
  useEffect(() => {
    if (error) alert('error', setAlertType, error, setAlertMsg, setAlertVisibility, dispatch)
  }, [dispatch, error])
  useEffect(() => {
    dispatch(getShipInfo())
  }, [dispatch])
  useEffect(() => {
    if (shipInfo) {
      setAddress(shipInfo.address)
      setCity(shipInfo.city)
      setState(shipInfo.state)
      setCountry(shipInfo.country)
      if (shipInfo.pincode === 0) setPincode('')
      else setPincode(shipInfo.pincode)
      if (shipInfo.phone === 0) setPhone('')
      else setPhone(shipInfo.phone)
    }
  }, [shipInfo])
  return (
    <>
      {loading ? <Loader /> : <>
        <MetaData title={`SHIPPING DETAILS`} />
        <Alert alertVisibility={alertVisibility} alertMsg={alertMsg} alertType={alertType} />
        <CheckoutSteps activeStep={2} />
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