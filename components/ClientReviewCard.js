import PropTypes from 'prop-types';
import { STRAPI_IMAGE_BASE_URL } from '../lib/constants';
import Image from 'next/image';

const ClientReviewCard = ({ clientReview, clientAvatar, clientName }) => {
    return (
        <div className="section_padding portfolio-testimonial">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <p>{clientReview}</p>
                        <figure>
                            {

                            }
                            <Image
                                src={`${STRAPI_IMAGE_BASE_URL}${clientAvatar}`}
                                // alt={clientAvatar?.alternativeText}
                                width="150"
                                height="150"
                                alt="Appzoro Client"
                                
                            />
                        </figure>
                        <span>{clientName}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
ClientReviewCard.propTypes = {
    t: PropTypes.func,
    clientReview: PropTypes.string,
    clientName: PropTypes.string,
    clientAvatar: PropTypes.string,
};
export default ClientReviewCard