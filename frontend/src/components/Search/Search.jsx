import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetaData from '../MetaData'
import './Search.css'

const Search = () => {
    const [keyword, setKeyword] = useState('')
    const navigate = useNavigate()
    const submitHandler = e => {
        e.preventDefault()
        if (keyword.trim()) navigate(`/products/${keyword}`)
    }
    return (
        <>
            <MetaData title={'ECOMMERCE'} />
            <form className="searchBox" onSubmit={submitHandler}>
                <input type="text" value={keyword} placeholder='Search a Product' onChange={e => setKeyword(e.target.value)} />
                <input type="submit" value={'Search'} />
            </form>
        </>
    )
}

export default Search