import React from "react";
import { useState, useEffect } from "react";
import "/workspaces/tutpic-contador/src/styles/Contador.css"

const Contador = () => {
    // VALOR DEL CONTADOR EN EL DISPLAY
    const [numGroup, setNumGroup] = useState([0, 0, 0, 0, 0, 0])
    // CONTADOR BRUTO
    const [count, setCount] = useState(0)
    // ID DE SETINTERVAL
    const [interId, SetInterId] = useState(0)
    // BOOLEANO QUE PRENDE Y APAGA CONTADOR
    const [loop, setLoop] = useState(false)
    // VALOR DE INICIO DE LA CUENTA ATRAS
    const [countdown, setCountdown] = useState(0)
    // BOOLEANO QUE REVIERTE EL SENTIDO DE LA CUENTA
    const [reverse, setReverse] = useState(false)
    // VALOR DE LA ALARMA
    const [alarm, setAlarm] = useState(0)


    // FUNCION QUE CUENTA HASTA UN LIMITE DE 999999, SUMANDO O RESTANDO
    // DEPENDIENDO DEL VALOR "REVERSE"

    const countHandler = () => { 
        if (!reverse) {
            setCount(prev => (prev + 1) % 1000000)
        }
        else{
            if(count == 0){
                setLoop(false)
                setReverse(false)
            }
            else{
                setCount(prev => (prev - 1) % 1000000)
            }
        }
    }

    // FUNCION QUE MANEJA EL BUCLE DEL CONTADOR, MANIPULADO POR "LOOP"

    const interHandler = () => {

        loop ? SetInterId(setInterval(countHandler, 1000)) : clearInterval(interId)
    }

    // FUNCION QUE TRANSFORMA "COUNT" EN UN ARRAY PARA SER MAPEADO

    const numGroupHandler = () => {
        let numArr = String(count).split("")
        while (numArr.length < 6) {
            numArr.unshift("0")
        }
        setNumGroup(numArr)
        console.log(numGroup)
    }

    // FUNCION QUE SE ASEGURA QUE EL INPUT DE LA CUENTA ATRAS SEA UN NUMERO

    const countdownHandler = (e) => {
        let input = Number(e.target.value)
        if (!isNaN(input)) {
            setCountdown(input)
            console.log(input)
        }
        else {
            setCountdown(0)
            console.log("error")
        }
    }

    // FUNCION QUE DETERMINA EL SENTIDO DE LA CUENTA

    const reverseHandler = () => {
        if (reverse) {           
            setCount(countdown)
            setLoop(true)
        }
        else{
            setCount(0)
            setLoop(false)
        }
        setCountdown(0)       
    }

    //FUNCION QUE MANEJA LA ALARMA

    const alarmHandler = (e) => {
        let alrm = Number(e.target.value)
        if(!isNaN(alrm)){
            setAlarm(alrm)
        }
        else{
            setAlarm(0)
        }
    }

    // EFFECT QUE TRANSFORMA "COUNT" EN UN ARRAY PARA MAPEAR

    useEffect(numGroupHandler, [count])

    // EFFECT QUE ENCIENDE Y APAGA EL CONTADOR

    useEffect(interHandler, [loop])

    // EFFECT QUE REVIERTE EL SENTIDO DEL CONTADOR

    useEffect(reverseHandler,[reverse])

    // EFFECT QUE ACTIVA LA ALERTA

    useEffect(()=>{
        if(alarm != 0 && count == alarm){
            alert("Tiempo objetivo alcanzado")
            setAlarm(0)
        }
    },[count,alarm])

    return (
        <div className="d-flex justify-content-center flex-column">
            <div className="d-flex justify-content-center m-3">
                <div className="caja bg-dark d-flex flex-row justify-content-evenly align-items-center text-white">
                    <div className="digito bg-dark border border-dark-subtle d-flex justify-content-center align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-alarm icono" viewBox="0 0 16 16">
                            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9z" />
                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1zm1.038 3.018a6 6 0 0 1 .924 0 6 6 0 1 1-.924 0M0 3.5c0 .753.333 1.429.86 1.887A8.04 8.04 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5M13.5 1c-.753 0-1.429.333-1.887.86a8.04 8.04 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1" />
                        </svg>
                    </div>
                    <ul className="d-flex flex-row justify-content-evenly">
                        {numGroup.map((ele, indx) => {
                            return (<li className="digito bg-dark border border-dark-subtle d-flex justify-content-center align-items-center" key={indx}>
                                {ele}
                            </li>)
                        })}
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <button type="button" className="btn btn-primary" onClick={() => { setLoop(prev => !prev) }}>{loop ? "Pausar Contador" : "Iniciar Contador"}</button>
                <button type="button" className="btn btn-primary" onClick={() => { setCount(0);setLoop(false) }}>Reiniciar Contador</button>
            </div>
            <div className="d-flex justify-content-center flex-row">
                <input type="text" value={countdown} onChange={countdownHandler} />
                <button type="button" className="btn btn-primary" onClick={() => setReverse(prev => !prev)} >{reverse ? "Cancelar cuenta atrás" : "Poner Cuenta Atrás"}</button>
            </div>
            <div className="d-flex justify-content-center flex-row m-2">
               <input type="text" value={alarm} onChange={alarmHandler} />
               <button className="btn btn-primary">Poner Alarma</button> 
            </div>
        </div>
    )
}

export default Contador