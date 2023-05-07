import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';

function TopArtists(props) {
  return (
    <>
      {props.topArtistsJson.map(topArtist =>
        <div className='col-md-4 text-center mb-5' key={topArtist.id}>
          <Stack>
            <div>
              <img src={topArtist.images[1].url} className="grow" height='230px'></img>
            </div>
            <h3>{topArtist.name}</h3>
          </Stack>
        </div>
      )}
    </>
  );
}

export default TopArtists;