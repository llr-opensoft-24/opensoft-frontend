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

      </div>
      <div className={Styles.shadow}></div>
    </div>
  )
}

export default HomeBanner;