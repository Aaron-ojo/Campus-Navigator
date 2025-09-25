import { useState } from "react";
import NavBar from "./NavBar";
import MyMap from "./MyMap";
import Search from "./search"; // ✅ using the Search component

// All locations (shared with MyMap + Search)
const locations = [
  { name: "OAU-MAIN-GATE", lat: 7.498513922395018, lng: 4.52221698742415 },
  { name: "AmphiTheatre", lat: 7.519538704610767, lng: 4.522156103235021 },
  {
    name: "Oduduwa Hall",
    lat: 7.51897059743468,
    lng: 4.52207138194439,
    image: "oduduwahall.jpg",
  },
  {
    name: "FTLT",
    lat: 7.519508586695006,
    lng: 4.528965994339157,
    image: "FTLT.jpg",
  },
  {
    name: "1000seater LT",
    lat: 7.521059778997691,
    lng: 4.519779672300961,
    image: "1000seater.jpg",
  },
  {
    name: "BOOC",
    lat: 7.518997934000816,
    lng: 4.525539350861695,
    image: "BOOC.jpg",
  },
  {
    name: "Hezekiah Oluwasanmi Library",
    lat: 7.519853126080705,
    lng: 4.5229168937401765,
    image: "Library.jpg",
  },
  {
    name: "ICT center",
    lat: 7.518714884701749,
    lng: 4.5293434012812925,
    image: "ICT.jpg",
  },
  { name: "Computer Building", lat: 7.517959229104742, lng: 4.528684591341449 },
  {
    name: "Admin Extension",
    lat: 7.521857178469172,
    lng: 4.51987961647887,
    image: "AdminExtension.jpg",
  },
  {
    name: "Ajose Hall",
    lat: 7.5213,
    lng: 4.526946811756186,
    image: "Ajose.jpg",
  },
  {
    name: "Alex Duduyemi LT",
    lat: 7.523948528369522,
    lng: 4.526352359057477,
    image: "Alexduduyemi.jpg",
  },
  {
    name: "Alumni Hall",
    lat: 7.521755821151774,
    lng: 4.516724095589321,
    image: "Alumni.jpg",
  },
  {
    name: "Angola Hall",
    lat: 7.522289754512512,
    lng: 4.512571629972128,
    image: "Angola.jpg",
  },
  {
    name: "Architecture",
    lat: 7.521401747983368,
    lng: 4.518321226523513,
    image: "Architecture.jpg",
  },
  {
    name: "Awolowo Hall",
    lat: 7.521293784505835,
    lng: 4.515697391207035,
    image: "Awolowo.jpg",
  },
  {
    name: "DSA",
    lat: 7.522119623532502,
    lng: 4.527476518327954,
    image: "DSA.jpg",
  },
  {
    name: "FBLT",
    lat: 7.522043678345562,
    lng: 4.524232101136557,
    image: "FBLT.jpg",
  },
  {
    name: "Geology",
    lat: 7.520838532961575,
    lng: 4.521718943465351,
    image: "Geology.jpg",
  },
  {
    name: "Health Center",
    lat: 7.520524378773302,
    lng: 4.516394080283482,
    image: "Healthcenter.jpg",
  },
  {
    name: "Ican Lecture theatre",
    lat: 7.521633148135438,
    lng: 4.520308416478868,
    image: "Ican.jpg",
  },
  {
    name: "Moremi Hall",
    lat: 7.520474506412491,
    lng: 4.520445893385167,
    image: "Moremi.jpg",
  },
  {
    name: "Mozambique Hall",
    lat: 7.522542922670838,
    lng: 4.51380585231083,
    image: "Mozambique.jpg",
  },
  {
    name: "Music Department",
    lat: 7.521855605428185,
    lng: 4.522125881546344,
    image: "Music.jpg",
  },
  {
    name: "Postgraduate Hall",
    lat: 7.522032649711087,
    lng: 4.517030779697262,
    image: "PGhall.jpg",
  },
  {
    name: "Spider",
    lat: 7.522910396748227,
    lng: 4.52915777285074,
    image: "Spider.jpg",
  },
  {
    name: "Pit Theater",
    lat: 7.521859020777927,
    lng: 4.521079455822084,
    image: "Pitheatre.jpg",
  },
  { name: "Fajuyi hall", lat: 7.523, lng: 4.518 },
  { name: "ETf Hall", lat: 7.522, lng: 4.517 },
  { name: "Akintola Hall", lat: 7.524, lng: 4.519 },
  { name: "Yellow House", lat: 7.5180411908431335, lng: 4.526691317728684 },
  {
    name: "White House",
    lat: 7.520166258062088,
    lng: 4.521411450253526,
    image: "Whitehouse.jpg",
  },
  { name: "Religion Ground", lat: 7.51061003399691, lng: 4.517544371128069 },
  { name: "Local government", lat: 7.508890466691939, lng: 4.5216020597210065 },
  { name: "Awovarsity", lat: 7.513872947041589, lng: 4.525033065593382 },
  { name: "Hslt", lat: 7.516577605531575, lng: 4.52490630850412 },
  {
    name: "student union building",
    lat: 7.517916631842728,
    lng: 4.521314537339125,
  },
  { name: "Incubation center", lat: 7.52241977833374, lng: 4.553433449643548 },
  { name: "Senate Building", lat: 7.518799463479474, lng: 4.524500317728673 },
  {
    name: "Faculty of Technology",
    lat: 7.517840165720766,
    lng: 4.528245075979342,
  },
  {
    name: "ETF lecture theatre",
    lat: 7.515670291325025,
    lng: 4.530744894531347,
    image: "ETF.jpg",
  },
  {
    name: "Oau conference and guest houses",
    lat: 7.52508606618523,
    lng: 4.5300909894976495,
  },
  { name: "New market", lat: 7.516754605626839, lng: 4.513604615185045 },
  {
    name: "Oaks park researcher lodge",
    lat: 7.518327321911296,
    lng: 4.530851941028959,
  },
  {
    name: "Africa Centre of Excellence",
    lat: 7.518220955891449,
    lng: 4.5300258207349495,
  },
];

const Home = () => {
  const [selected, setSelected] = useState(null);

  return (
    <main>
      <header>
        <div className="header">
          <img src="oaulogo.png" alt="headerLogo" className="header-logo" />
          <p className="logo-title">OAU Campus Navigator</p>
          <NavBar />
        </div>
      </header>

      <section>
        <div className="top-section">
          <p className="find">Find Your Lecture Theatre</p>
          <p className="enter">Enter a name to get the fastest route</p>

          {/* ✅ Integrated Search.jsx */}
          <Search locations={locations} onSelect={setSelected} />
        </div>
      </section>

      <section>
        <div className="middle-section">
          <div className="map-container">
            <MyMap
              locations={locations}
              setSelected={setSelected}
              selectedLocation={selected}
            />
          </div>

          {/* <div className="vector-step"> */}
          {/* {selected ? ( */}
          {/* // <div className="location-details"> */}
          {/* <h2>{selected.name}</h2> */}
          {/* ✅ removed inline styles */}
          {/* <img src={`/images/${selected.name}.jpg`} alt={selected.name} /> */}
          {/* <p>Details about {selected.name} go here.</p> */}
          {/* </div> */}
          {/* ) : ( */}
          {/* <p>Click a marker or search to see details here.</p> */}
          {/* )} */}
          {/* </div> */}
        </div>
      </section>

      <footer>
        <div className="footer">
          <p className="designed">DESIGNED BY PART 2, GROUP 16 SWEP STUDENTS</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
