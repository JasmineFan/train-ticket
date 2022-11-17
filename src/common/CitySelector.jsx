import React, { useState, useCallback,useEffect, useMemo, memo } from "react"
import './CitySelector.css'
import classnames from "classnames"
import PropTypes from 'prop-types'

const CityItem = memo(function CityItem(props){
    const {name, onSelect} = props
    return (
        <li className="city-li" onClick={()=>onSelect(name)}>
            {name}
        </li>
    )
})
CityItem.protoTypes = {
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}
function CitySection(props){
    const {
        title,
        cities = [],
        onSelect
    } = props
    return (  //title 就是英文字母，比如A 开头啥的
        <ul className="city-ul">
            <li className="city-li" key="title" data-cate={title}>{title}</li>
            {
                cities.map(city=>{
                    return <CityItem key={city.name} name={city.name} onSelect={onSelect}/>
                })
            }
        </ul>
    )
}

CitySection.protoTypes = {
    title: PropTypes.string.isRequired,
    cities:PropTypes.array,
    onSelect: PropTypes.func.isRequired
}

function CityList(props){
    const {sections, onSelect, toAlpha} = props
    return (
        <div className="city-list">
            <div className="city-cate">
                {
                    sections.map(section=>{
                        return (
                            <CitySection 
                                key={section.title} 
                                title={section.title} 
                                cities={section.citys} 
                                onSelect={onSelect}
                            ></CitySection>
                        )
                    })
                }
            </div>
            <div className="city-index">
                {alphabet.map(alpha=>{
                    return (
                        <AlphaIndex alpha={alpha} key={alpha} onClick={toAlpha}/>
                    )
                })}
            </div>
        </div>
    )

}

CityList.protoTypes = {
    sections: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    toAlpha: PropTypes.func.isRequired
}

const AlphaIndex = memo(function AlphaIndex(props){
    const  {alpha, onClick}= props
    return (
        <i className="city-index-item" onClick={()=>onClick(alpha)}>
            {alpha}
        </i>
    )
})
AlphaIndex.protoTypes = {
    alpha: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,

}

const alphabet = Array.from(new Array(26), (ele, index)=>{
    return String.fromCharCode(65+index)
})

const SuggestItem = memo(function SuggestItem(props){
    const {name, onClick} = props
    return (
        <li className="city-suggest-li" onClick={()=>onClick(name)}>
            {name}
        </li>
    )
})

SuggestItem.protoTypes = {
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

const Suggest = memo(function Suggest(props){
    const {searchKey, onSelect} = props
    const [result, setResult] = useState([])
    useEffect(()=>{
        fetch('/rest/search?key='+encodeURIComponent(searchKey))
            .then(res=>res.json())
            .then(data=>{
                const {result,searchKey:skey} = data
                if(skey=== searchKey){
                    setResult(result)
                }
            })
    },[searchKey])
    // const fallbackResult = result.length? result:[{display:searchKey}]

    const fallbackResult = useMemo(()=>{
        if(result.length){
            return result
        } else {
            return [{display:searchKey}]
        }
    },[result, searchKey])
    return(
        <div className="city-suggest">
            <ul className="city-suggest-ul">
                {
                    fallbackResult.map((item)=>{
                        return (
                            <SuggestItem key={item.display} name={item.display} onClick={onSelect}/>
                        )
                    })
                }
            </ul>
        </div>
    )
})

Suggest.protoTypes = {
    searchKey: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}
export default function CitySelector(props) {
    const {
        show,
        cityData,
        isLoading,
        onBack,
        fetchCityData,
        onSelect
    } = props

    const [searchKey, setSearchKey] = useState('')
    const key = useMemo(() => searchKey.trim(), [searchKey])

    useEffect(()=>{
        if(!show || cityData ||isLoading){
            return
        }
        fetchCityData()
    },[show, cityData, isLoading])

    const outputCitySection = ()=>{
        if(isLoading){
            return(<div>loading time</div>)
        }
        if(cityData){
            return(<CityList sections={cityData.cityList} onSelect={onSelect} toAlpha={toAlpha}></CityList>)
        }
        return <div>error</div>
    }

    const toAlpha = useCallback(alpha =>{
        // console.log("alpha",alpha)
        document.querySelector(`[data-cate='${alpha}']`).scrollIntoView()
    },[])

    return (
        // <div className={["city-selector", (!show) && 'hidden'].filter(Boolean).join(' ')}></div>
        <div className={classnames("city-selector", { hidden: !show })} >
            <div className="city-search" >
                <div className="search-back" onClick={() => onBack()}>
                    <svg width="42" height="42">
                        <polyline points="25,13,16,21,25,29" stroke="#fff" strokeWidth="2" fill="none" />
                    </svg>
                </div>
                <div className="search-input-wrapper">
                    <input type="text" value={searchKey} className="search-input" placeholder="城市车站" onChange={e => setSearchKey(e.target.value)}></input>
                </div>
                <i onClick={() => setSearchKey(key)} className={classnames("search-clean", {
                    hidden: key.length === 0
                })}> &#xf063;</i>
            </div>
            {
                Boolean(key) && (
                    <Suggest searchKey={key} onSelect={key=>onSelect(key)}/>
                )
            }
            {outputCitySection()}
        </div>
    )
}
CitySelector.propTypes = {
    show: PropTypes.bool.isRequired,
    cityData: PropTypes.object,
    isLoading: PropTypes.bool.isRequired,
    onBack: PropTypes.func.isRequired,
    fetchCityData:PropTypes.func.isRequired,
    onSelect:PropTypes.func.isRequired,

}