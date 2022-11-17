import './App.css'
import { connect } from 'react-redux'
import React, { useCallback, useMemo } from 'react'
import Header from '../common/Header.jsx'
import DepartDate from './DepartDate'
import HighSpeed from './HighSpeed'
import Journey from './Journey'
import Submit from './Submit'
import { exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData, setSelectedCity } from './actions'
import { bindActionCreators } from 'redux'
import CitySelector from '../common/CitySelector'


function App(props) {
    const { from, to, dispatch, isCitySelectorVisible,cityData, isLoadingCityData } = props
    const onBack = useCallback(() => {
        window.history.back()
    }, [])
    // const doExchangeFromTo = useCallback(()=>{
    //     dispatch(exchangeFromTo())
    // },[])   
    // const doShowCitySelector =useCallback((selectLeft)=>{
    //     dispatch(showCitySelector(selectLeft))
    // },[])   
    const cbs = useMemo(() => {
        return bindActionCreators({
            exchangeFromTo,
            showCitySelector

        }, dispatch)
    }, [])

    const CitySelectorCbs = useMemo(()=>{
        return bindActionCreators({
            onBack: hideCitySelector,
            fetchCityData,
            onSelect: setSelectedCity
        }, dispatch)
    },[])


    return (
        <div>
            <div className='header-wrapper'>
                <Header title="火车票" onBack={onBack} />
            </div>
            {/* <Journey from={from} to={to} exchangeFromTo={doExchangeFromTo} showCitySelector={doShowCitySelector}/> */}
            <form>
                <Journey from={from} to={to} {...cbs} />
                <DepartDate />
                <HighSpeed />
                <Submit />
            </form>
            <CitySelector 
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoading={isLoadingCityData}
                {...CitySelectorCbs} />
        </div>
    )
}
export default connect(
    function mapStateToProps(state) {
        return state
    },
    function mapDispatchToProps(dispatch) {
        return { dispatch }
    }
)(App)