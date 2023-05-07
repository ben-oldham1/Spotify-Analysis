import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';

function TopTracks(props) {
    return (
        <>
            {props.topTracksJson.map(topTrack =>
                <div className='col-md-4 text-center mb-5' key={topTrack.id}>
                    <Stack>
                        <div className='mb-3'>
                            <img src={topTrack.album.images[0].url} className="grow" height='200px'></img>
                        </div>
                        <h3 className="text-white">{topTrack.name}</h3>
                    </Stack>
                </div>
            )}
        </>
    );
}

export default TopTracks;