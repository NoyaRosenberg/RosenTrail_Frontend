import {Location} from "../../services/geocoding.service";

export interface Place {
    name: string;
    location: Location;
    photoUrl?: string;
}

interface PlaceDetailsProps {
    place: Place
}

const PlaceDetails = ({ place }: PlaceDetailsProps) => {
    return (
        <div>
            <h2>{place.name}</h2>
            {place.photoUrl && (
                <img
                    src={place.photoUrl}
                    alt={place.name}
                    style={{
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'cover',
                    }}
                />
            )}
            <p>Details about the activity can be shown here.</p>
        </div>
    )
};

export default PlaceDetails;

