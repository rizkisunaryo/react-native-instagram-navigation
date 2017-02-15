import Constant from '../Constant';

export function changePage(page) {
  return {
    type: Constant.ACTION.CHANGE_PAGE,
    page
  }
}

export function changePageBack(page) {
  return {
    type: Constant.ACTION.CHANGE_PAGE_BACK,
    page
  }
}

export function setAskPageToSetCurrentSubpageId(containerPage) {
  return {
    type: Constant.ACTION.SET_ASK_PAGE_TO_SET_CURRENT_SUBPAGE_ID,
    containerPage,
  }
}

export function setBackAndroid() {
  return {
    type: Constant.ACTION.SET_BACK_ANDROID,
  }
}

export function setBackPage() {
  return {
    type: Constant.ACTION.SET_BACK_PAGE,
  }
}

export function setBackSubpage(containerPage) {
  return {
    type: Constant.ACTION.SET_BACK_SUBPAGE,
    containerPage
  }
}

export function setCurrentSubpageId(id) {
  return {
    type: Constant.ACTION.SET_CURRENT_SUBPAGE_ID,
    id,
  }
}

export function setExitFullscreen() {
  return {
    type: Constant.ACTION.SET_EXIT_FULLSCREEN,
  }
}

export function setHideFullscreen() {
  return {
    type: Constant.ACTION.SET_HIDE_FULLSCREEN,
  }
}

export function setNextSubpage(containerPage, subpageType, data = null) {
  return {
    type: Constant.ACTION.SET_NEXT_SUBPAGE,
    containerPage,
    subpageType,
    data,
  }
}

export function setPressSameButton(page) {
  return {
    type: Constant.ACTION.SET_PRESS_SAME_BUTTON,
    page
  }
}

export function setSubpageScrollTop(containerPage, subpageId) {
  return {
    type: Constant.ACTION.SET_SUBPAGE_SCROLL_TOP,
    containerPage,
    subpageId,
  }
}
