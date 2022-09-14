import 'bootstrap/dist/css/bootstrap.min.css'
import { TabContainer, InputGroup, FormControl, Button, Card, Row } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID_SPOTIFY
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET

export default function Recherche() {
    const [searchInput, setSearchInput] = useState("Moise MBIYE")
    const [accessToken, setAccessToken] = useState("")
    const [artistId, setArtisteId] = useState('')
    const [albums, setAlbums] = useState([]);
    const [albumId,setAlbumId] = useState('2HkiLlN9SXxPYlKM7FxbSn')
    const [showIframe,setShowIframe] = useState(true);

    useEffect(() => {
        //API access token
        let authParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParams)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    //Search albums list by artist name
    async function search() {
        let searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken
            }
        }
        fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => setArtisteId(data.artists.items[0].id))

        fetch('https://api.spotify.com/v1/artists/' + artistId + '/albums?include_groups=album&market=US&limit=50', searchParameters)
            .then(response => response.json())
            .then(data =>{setAlbums(data.items);})
    }
    search();

    return (
        <div className='search'>
            <div className='albums'>
                <Row className='mx-2 row row-cols-4'>
                    {
                        albums && albums.map((item, index) => {
                            return (
                                <Card className='carte'>
                                    <Card.Img src={item.images[0].url} onClick={()=>{setAlbumId(item.id); setShowIframe(true)}} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                    </Card.Body>
                                </Card>
                            )
                        })
                    }
                    {                
                        showIframe &&  <iframe title='my reader' className='lecteur'  src={"https://open.spotify.com/embed/album/"+albumId+"?utm_source=generator"} width="100%" height="100%" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> 
                    } 
                </Row>
            </div>
            <div>
                <TabContainer className='mb-3' size='1g'>
                    <InputGroup className='inputsearch'>
                        <FormControl
                            placeholder="Entrez le nom de l'artiste"
                            type='input'
                            onChange={(event) =>{setSearchInput(event.target.value);}}
                        />
                        <Button onClick={search}>Chercher</Button>
                    </InputGroup> 
                </TabContainer> 
            </div>
        </div>
    )
}