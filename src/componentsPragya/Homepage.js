import React from 'react';
import './Homepage.css';

function Homepage({lightBg, headline, desc1, desc2, desc3, img, alt, imgStart,heading,img1,cap1,img2,cap2,img3,cap3,img4,cap4,img5,cap5,img6,cap6}) {
    return (
        <>
            <div className='home_section'>
                    <div className="row imgpos" style={{ display: 'flex', flexDirection: imgStart === 'start' ? 'row-reverse' : 'row' }}>
                        <div className="col">
                            <div className="h-wrapper">
                                <h1 className="heading">{headline}</h1>
                                <p className='home_hero-subtitle' >{desc1}<br />{desc2}<br /><br />{desc3}</p>
                                
                            </div>
                        </div>
                        <div className="col">
                            <div className="home-img-wrapper">
                                <img src={img} alt={alt} id='home-img' />
                            </div>
                        </div>
                    </div>
            </div>            
                
            <div className="diffBg">
            <h1 className="headingy diffBg">{heading}</h1>
                <div className="key-features">
                    <figure id="img-cap">
                        <img src={img1} id="imag" alt="alt" />
                        <figcaption>{cap1}</figcaption>
                    </figure>
                    <figure id="img-cap">
                        <img src={img2} id="imag" alt="alt" />
                        <figcaption>{cap2}</figcaption>
                    </figure>
                    <figure id="img-cap">
                        <img src={img3} id="imag" alt="alt" />
                        <figcaption>{cap3}</figcaption>
                    </figure>
                    <figure id="img-cap">
                        <img src={img4} id="imag" alt="alt" />
                        <figcaption>{cap4}</figcaption>
                    </figure>
                    <figure id="img-cap">
                        <img src={img5} id="imag" alt="alt" />
                        <figcaption>{cap5}</figcaption>
                    </figure>
                    <figure id="img-cap">
                        <img src={img6} id="imag" alt="alt" />
                        <figcaption>{cap6}</figcaption>
                    </figure>
                </div>
            </div>
                
            
                
        </>
    )
}

export default Homepage
