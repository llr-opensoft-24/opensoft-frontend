import Styles from './homebanner.module.css';
const HomeBanner = () => {
  return(
    <div className={Styles.home_banner}>
      <div className={Styles.our_story}>
        <div className={Styles.container}>
          <div className={Styles.heading}>
            <div className={Styles.flix}>
                <p><span className="flix">Flix</span><span className={Styles.pedia}>Pedia</span></p>
            </div>
            <div className={Styles.options}>
                <p> <span className="search">SEARCH</span> <span className="dash">|</span> <span className="discover">DISCOVER</span><span className="dash">|</span> <span className="enjoy">ENJOY</span></p>
            </div>
           </div>
        </div>

        <div className={Styles.input_group}>
          <input className={`${Styles.form_control} ${Styles.searchInput}`} type="text" placeholder="Search" />
        </div>
      </div>
      <div className={Styles.shadow}></div>
      <img className="concord-img vlv-creative" src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"  alt=""></img>
    </div>
  )
}

export default HomeBanner;