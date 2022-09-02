import React, { useState, useRef,useEffect } from 'react'

const CLIENT_ID = "1a89139441e04dbba687217471298e3c"
const CLIENT_SECRET = "8d2ccff09951406ba467592c4d5d1117"
export default function Recherche() {
    useEffect(()=>{
        let params = {
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencode'
            },
            body:'grant_type=client_credentials&client_id='+CLIENT_ID+'&client_secret='+CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token',params)
        .then(res=>res.json())
        .then(res=>console.log(res.access_token))
    },[])

    const [titre, setTitre] = useState('');
    const [select, setSelect] = useState([])
    const [choose, setChoose] = useState(false)


    let songs = [
        {
            'title': 'Je suis là',
            'auteur': 'Moise MBIYE',
            'year': 2014,
            'song': require('./suis.mp3')
        },
        {
            'title': 'Je suis là encore',
            'auteur': 'Moise MBIYE',
            'year': 1996,
            'song': require('./suis.mp3')
        },
        {
            'title': 'Royal',
            'auteur': 'Moise MBIYE',
            'year': 2016,
            'song': require('./suis.mp3')
        },
        {
            'title': 'Royal encore',
            'auteur': 'Moise Mbiye',
            'year': 2005,
            'song': require('./suis.mp3')
        },
        {
            'title': 'Royal et je suis là',
            'auteur': 'Moise MBIYE',
            'year': 1995,
            'song': require('./suis.mp3')
        },
        {
            'title': 'Je suis là et royal',
            'auteur': 'Moise MBIYE',
            'year': 1995,
            'song': require('./suis.mp3')
        }
    ];

    let music;

    const filtreChanson = (element) => {
        if (element.title === titre) {
            return element
        }
    }
    let ref1 = useRef(null)
    let ref2 = useRef(null)
    return (
        <div className='principale'>
            <input placeholder='Entrez le titre'
                onChange={(e) => { setTitre(e.target.value) }}
            ></input>
            <button
                onClick={() => { if (music != null) { music.pause(); setSelect(songs.filter(filtreChanson)); setChoose(true); } else { setSelect(songs.filter(filtreChanson)); setChoose(true); } }}
            >Chercher</button>
            {
                choose && <span onClick={() => { music = new Audio(select[0].song); music.play(); console.log('On est en train de lire cette chanson') }}>{select[0].title}</span>
            }
            <div>
                <button ref={ref1} onClick={() => { music.play(); }}>Play</button>
                <button ref={ref2} onClick={() => { music.pause(); }}>Pause</button>
            </div>
        </div>
    )
}