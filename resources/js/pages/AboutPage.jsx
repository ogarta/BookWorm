import { Container } from "react-bootstrap";
import '../../css/aboutPage.scss';
export default function AboutPage() {
    return (
        <>
            <Container className="container-about">
                <div>
                    <h3 className="title-about mt-2">About Us</h3>
                    <hr />
                </div>
                <div className="about-welcome row">
                    <h3>Welcome to Bookworm</h3>
                    <p>"Bookworm is an independent New York bookstore and language school with locations in Manhattan and Brooklyn. We specialize in travel books and language classes."</p>
                </div>
                <div className="about-story-vision row">
                    <div className="about-story col-6">
                        <h3>Our Story</h3>
                        <p>The name Bookworm was taken from the original name for New York International Airport, which was renamed JFK in December 1963.</p>
                        <p>Our Manhattan store has just moved to the West Village. Our new location is 170 7th Avenue South, at the corner of Perry Street.</p>
                        <p>From March 2008 through May 2016, the store was located in the Flatiron District.</p>
                    </div>
                    <div className="about-vision col-6">
                        <h3>Our Vision</h3>
                        <p>One of the last travel bookstores in the country, our Manhattan store carries a range of guidebooks (all 10% off) to suit the needs and tastes of every traveller and budget.</p>
                        <p>We believe that a novel or travelogue can be just as valuable a key to a place as any guidebook, and our well-read, well-travelled staff is happy to make reading recommendations for any traveller, book lover, or gift giver.</p>
                    </div>
                </div>
            </Container>
        </>
    );
}