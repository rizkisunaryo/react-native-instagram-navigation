import { combineReducers } from 'redux';
import uuidV4 from 'uuid/v4';
import Constant from '../Constant';

function askPageToSetCurrentSubpageId(state = {
  flagNew: '',
  containerPage: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_ASK_PAGE_TO_SET_CURRENT_SUBPAGE_ID:
      return {
        flagNew: uuidV4(),
        containerPage: action.containerPage,
      }
    default:
      return state;
  }
}

function backAndroid(state = {
  flagNew: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_BACK_ANDROID:
      return {
        flagNew: uuidV4(),
      }
    default:
      return state;
  }
}

function backPage(state = {
  flagNew: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_BACK_PAGE:
      return {
        flagNew: uuidV4(),
      }
    default:
      return state;
  }
}

function backSubpage(state = {
  flagNew: '',
  containerPage: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_BACK_SUBPAGE:
      return {
        flagNew: uuidV4(),
        containerPage: action.containerPage,
      }
    default:
      return state;
  }
}

function currentSubpageId(state = {
  id: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_CURRENT_SUBPAGE_ID:
      return {
        id: action.id,
      }
    default:
      return state;
  }
}

function hideFullscreen(state = {
  flagNew: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_HIDE_FULL_SCREEN:
      return {
        flagNew: uuidV4(),
      }
    default:
      return state;
  }
}

function nextSubpage(state = {
  flagNew: '',
  containerPage: '',
  subpageType: '',
  data: null,
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_NEXT_SUBPAGE:
      return {
        flagNew: uuidV4(),
        containerPage: action.containerPage,
        subpageType: action.subpageType,
        data: action.data,
      }
    default:
      return state;
  }
}

function page(state = {
  page: Constant.PAGE.HOME,
  isBack: false,
}, action) {
  switch (action.type) {
    case Constant.ACTION.CHANGE_PAGE:
      return {
        page: action.page,
        isBack: false,
      }
    case Constant.ACTION.CHANGE_PAGE_BACK:
      return {
        page: action.page,
        isBack: true,
      }
    default:
      return state;
  }
}

function pressSameButton(state = {
  flagNew: '',
  page: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_PRESS_SAME_BUTTON:
      return {
        flagNew: uuidV4(),
        page: action.page,
      }
    default:
      return state;
  }
}

function subpageScrollTop(state = {
  flagNew: '',
  containerPage: '',
  subpageId: '',
}, action) {
  switch (action.type) {
    case Constant.ACTION.SET_SUBPAGE_SCROLL_TOP:
      return {
        flagNew: uuidV4(),
        containerPage: action.containerPage,
        subpageId: action.subpageId,
      }
    default:
      return state;
  }
}

const asyncReducers = combineReducers({
  askPageToSetCurrentSubpageId,
  backAndroid, 
  backPage,
  backSubpage,
  currentSubpageId,
  hideFullscreen,
  nextSubpage,
  page,
  pressSameButton,
  subpageScrollTop,
});

export default asyncReducers