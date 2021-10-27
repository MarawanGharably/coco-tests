import PropTypes from 'prop-types';

function Hotspot(props) {
    // console.log('-Hotspot', props);

    return false;
}

Hotspot.defaultProps = {
    type: 'hotspot',
};

Hotspot.propTypes = {
    hotspot_type: PropTypes.string.isRequired,
    collider_transform: PropTypes.array.isRequired,
    transform: PropTypes.array.isRequired,
    userData: PropTypes.object,
    UIConfig: PropTypes.shape({
        Component: PropTypes.object.isRequired,
        style: PropTypes.object,
        positionNextToTheElement: PropTypes.bool,
    }),
};

export default Hotspot;
