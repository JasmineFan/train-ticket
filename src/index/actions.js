export const ACTION_SET_FROM = 'SET_FROM '
export const ACTION_SET_TO = 'SET_TO'
export const ACTION_SET_ISCITYSELECTORVISIBLE = 'SET_ISCITYSELECTORVISIBLE'
export const ACTION_SET_CURRENTSELECTINGLEFTCITY = 'SET_CURRENTSELECTINGLEFTCITY'
export const ACTION_SET_CITYDATA = 'SET_CITYDATA'
export const ACTION_SET_ISLOADINGCITYDATA = 'SET_ISLOADINGCITYDATA'
export const ACTION_SET_ISDATESELECTORVISIBLE = 'SET_ISDATESELECTORVISIBLE'
export const ACTION_SET_HIGHSPEED = 'SET_HIGHSPEED'
export const ACTION_SET_DEPARTDATE = 'SET_DEPARTDATE'
export function setFrom(from){
    return {
        type:ACTION_SET_FROM,
        payload:from
    }
}
export function setTo(to){
    return {
        type:ACTION_SET_TO,
        payload:to
    }
}
export function setDepartDate(departDate){
    return {
        type:ACTION_SET_DEPARTDATE,
        payload:departDate
    }
}

//把ACTION_SET_CURRENTSELECTINGLEFTCITY  和ACTION_SET_ISCITYSELECTORVISIBLE 绑定到一起，
// 用到异步的action
export function showCitySelector(currentSelectingLeftCity){
    return (dispatch)=>{
        dispatch({
            type:ACTION_SET_ISCITYSELECTORVISIBLE,
            payload: true
        })
        dispatch({
            type:ACTION_SET_CURRENTSELECTINGLEFTCITY,
            payload: currentSelectingLeftCity
        })
    }
}

export function hideCitySelector(){
    return {
        type:ACTION_SET_ISCITYSELECTORVISIBLE,
        payload: false
    }
}
export function setSelectedCity(city){
    return (dispatch, getState)=>{
        const {currentSelectingLeftCity} = getState()
        if(currentSelectingLeftCity){
            dispatch(setFrom(city))
        } else {
            dispatch(setTo(city))
        }
    }
}
export function showDateSelector(){
    return {
        type:ACTION_SET_ISDATESELECTORVISIBLE,
        payload: true
    }
}
export function hideDateSelector(){
    return {
        type:ACTION_SET_ISDATESELECTORVISIBLE,
        payload: false
    }
}
export function exchangeFromTo(){
    return (dispatch, getState)=>{
        const {from, to} = getState()
        dispatch(setFrom(to))
        dispatch(setTo(from))
    }
}
export function setIsLoadingCityData(isLoadingCityData){
    return {
        type:ACTION_SET_ISLOADINGCITYDATA,
        payload:isLoadingCityData
    }
}
export function setCityData(cityData){
    return {
        type:ACTION_SET_CITYDATA,
        payload:cityData
    }
}
// 对于一个state 里面的值取反，用到异步的action
export function toggleHighSpeed(){
    return (dispatch, getState)=>{
        const {highSpeed} = getState()
        dispatch({
            type:ACTION_SET_HIGHSPEED,
            payload:! highSpeed
        })
    }
}

export function fetchCityData(){
    return (dispatch, getState)=>{
        const { isLoadingCityData } = getState()
        if(isLoadingCityData){
            return
        }
        const cache = JSON.parse(localStorage.getItem('city_data_cache')||'{}')
        if(Date.now()<cache.expires){
            dispatch(setCityData(cache.data))
            return
        }
        dispatch(setIsLoadingCityData(true))
        fetch('/rest/cities?_'+Date.now())
            .then(res=>res.json())
            .then(cityData=>{
                dispatch(setCityData(cityData))
                localStorage.setItem('city_data_cache', JSON.stringify({
                    expires:Date.now() +60 * 1000,
                    data:cityData
                }))
                dispatch(setIsLoadingCityData(false))
            })
            .catch(()=>{
                dispatch(setIsLoadingCityData(false))
            })
    }
}