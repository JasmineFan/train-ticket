import React, { useState, useEffect, useMemo } from "react"
import './CitySelector.css'
import classnames from "classnames"
import PropTypes from 'prop-types'
export default function CitySelector(props) {
    const {
        show,
        cityData,
        isLoading,
        onBack,
        fetchCityData
    } = props

    const [searchKey, setSearchKey] = useState('')
    const key = useMemo(() => searchKey.trim(), [searchKey])

    useEffect(()=>{
        if(!show || cityData ||isLoading){
            return
        }
        fetchCityData()
    },[show, cityData, isLoading])

    return (
        // <div className={["city-selector", (!show) && 'hidden'].filter(Boolean).join(' ')}></div>
        <div className={classnames("city-selector", { hidden: !show })} >
            <div className="city-search" onClick={() => onBack()}>
                <div className="search-back">
                    <svg width="42" height="42">
                        <polyline points="25,13,16,21,25,29" stroke="#fff" strokeWidth="2" fill="none" />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input type="text" value={searchKey} className="search-input" placeholder="城市车站" onChange={e => setSearchKey(e.target.value)}></input>
                </div>
                <i onClick={() => setSearchKey("")} className={classnames("search-clean", {
                    hidden: key.length === 0
                })}> &#xf063;</i>
            </div>
        </div>
    )
}
CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchCityData:PropTypes.func.isRequired,
}