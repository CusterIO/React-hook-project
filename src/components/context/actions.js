import {
  TYPE_SETPROFILE,
  VALUE_FALSE,
  VALUE_TRUE,
  TYPE_CLOSELOGIN,
  TYPE_OPENLOGIN,
  TYPE_OPENSIGNIN,
  TYPE_EDITARTICLE,
  TYPE_OPENARTICLE
} from './constants';
// Type constanst
const TYPE_RESETARTICLEFIELD = 'resetArticleFields';
const TYPE_RESETLINKFIELD = 'resetLinkFields';
// ACTIONS
export const ACTION_HIDEPROFILE = { type: TYPE_SETPROFILE, value: VALUE_FALSE };
export const ACTION_SHOWPROFILE = { type: TYPE_SETPROFILE, value: VALUE_TRUE };
export const ACTION_CLOSELOGIN = { type: TYPE_CLOSELOGIN };
export const ACTION_OPENLOGIN = { type: TYPE_OPENLOGIN };
export const ACTION_OPENSIGNIN = { type: TYPE_OPENSIGNIN };
export const ACTION_EDITARTICLE = { type: TYPE_EDITARTICLE, value: VALUE_TRUE };
export const ACTION_OPENARTICLE = article => {
  return { type: TYPE_OPENARTICLE, value: article };
};
export const ACTION_RESETARTICLEFIELD = { type: TYPE_RESETARTICLEFIELD };
export const ACTION_RESETLINKFIELD = { type: TYPE_RESETLINKFIELD };
