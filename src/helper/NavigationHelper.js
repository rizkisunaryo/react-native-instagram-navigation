import Constant from '../Constant';
import SPFullScreen from '../components/subpages/SPFullScreen';
import SPHome from '../components/subpages/SPHome';
import SPLove from '../components/subpages/SPLove';
import SPProfile from '../components/subpages/SPProfile';
import SPSearch from '../components/subpages/SPSearch';

export function getSubPage(subpageType) {
  let SubPage = null;
  switch (subpageType) {
    case Constant.SUBPAGE.SPFullScreen:
      SubPage = SPFullScreen;
      break;
    case Constant.SUBPAGE.SPHome:
      SubPage = SPHome;
      break;
    case Constant.SUBPAGE.SPLove:
      SubPage = SPLove;
      break;
    case Constant.SUBPAGE.SPProfile:
      SubPage = SPProfile;
      break;
    case Constant.SUBPAGE.SPSearch:
      SubPage = SPSearch;
      break;
  }
  return SubPage;
}
