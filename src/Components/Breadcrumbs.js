import { Link, Redirect, useLocation } from 'react-router-dom'

// breadcrumb styling is in index.css
export default function Breadcrumbs() {
  const location = useLocation()

  let currentLink = ''

  //take the path and split it up removing slash and the trailing empty string
  const crumbs = location.pathname.split('/')
    .filter(crumb => crumb !== '')
    .map(crumb => {
      currentLink += `/${crumb}`

      //if on postings page pass card info
      //if on submission portal pass posting, classname, sectionID
      if (currentLink === "/postings") {
        const card = location.state?.card;
        return (
          <div className="crumb" key={crumb}>
            <Link to={{ pathname: currentLink, state: { card: card } }}>{crumb}</Link>
          </div>
        )
      } else if (currentLink === "/postings/submission-portal") {
        const posting = location.state?.posting;
        const className = location.state?.className;
        const sectionID = location.state?.sectionID;
        return (
          //returns breadcrumb array
          <div className="crumb" key={crumb}>
            <Link to={{ pathname: currentLink, state: {posting: posting, className: className, sectionID: sectionID} }}>{crumb}</Link>
          </div>

        )
      }
      else if(currentLink === '/my-account'){
        <div className="crumb" key={crumb}>
          <Link to={currentLink}>{crumb}</Link>
        </div>

      }
      else if(currentLink === "/my-account/create-posting"){
        return (
          //returns breadcrumb array
          <div className="crumb" key={crumb}>
            <Link to={currentLink}>{crumb}</Link>
          </div>

        )

      }
    })

  if (crumbs.length != 0) {
    return (
      //display link to home, chevron, followed by the breadcrumb array
      <div className="breadcrumbs">
        <Link to='/' id="linkid"><li><a>Home</a></li></Link>
        <li><a>&gt;</a></li>
        {crumbs}
      </div>
    )
  } else {
    return (
      //if length is 0 only put link to home w/o chevron
      //linkid changes the color of home link to match the other breadcrumb links
      <div className="breadcrumbs">
        <Link to='/' id="linkid"><li><a>Home</a></li></Link>
      </div>
    )
  }
}
