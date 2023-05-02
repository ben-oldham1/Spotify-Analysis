import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';

function TopArtists(props) {
  return (
    <>
      {props.topArtistsJson.map(topArtist =>
        <Col className='col-4 text-center' key={topArtist.id}>
          <Stack>
            <div>
              <img src={topArtist.images[1].url} className="grow" height='230px'></img>
            </div>
            <h3>{topArtist.name}</h3>
          </Stack>
        </Col>
      )}
    </>
  );
}

export default TopArtists;