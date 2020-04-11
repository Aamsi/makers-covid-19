import React, { useState, useEffect } from 'react';
import './Collectif.css';


const Collectif = () => {

  const [organisations, setOrganisations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let organisations = [];
      try {
        organisations = await fetch('/.netlify/functions/getData?organisations=all');
        organisations = await organisations.json();

      } catch (error) {
        console.log(error);
      };

      setOrganisations(organisations);
      setLoading(false);
    };

    fetchData();
  }, []);


  return (
    <section className={"Collectif section"}>
      <h2 className={'Collectif__Title'}>Le Collectif</h2>
      <div className={`Collectif__Members ${loading ? 'loading' : 'loaded'}`}>

        {organisations.map((el, i) => {
          
          return( 
            <div key={i} className={'Member'}>
              <a className={'Member__Link'} href={el.websiteUrl} target="_blank" rel="noopener noreferrer"></a>
              {el.logoUrl === null ?
                (<span className={'Member__Initials'} > {el.name.slice(0,2)} </span>)
                : 
                (<img className={'Member__Logo'} alt={el.name} src={el.logoUrl} />)
              }
            </div>
            )
      }
        )}
       </div>
    </section>

  )
}

export default Collectif;
