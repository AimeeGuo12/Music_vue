import {playMode} from 'common/js/config'
import {loadSearch, loadPlay, loadFavorite} from 'common/js/cache'

const state = {
  singer: {},
  // 播放器状态
  playing: false,
  fullScreen: false,
  playlist: [], // 播放列表
  sequenceList: [], // 顺序排 随机播放时与playlist不一样
  mode: playMode.sequence, // 播放模式  config.js文件
  currentIndex: -1, // 当前播放索引 currentSong放在getter中 通过playlist和currentIndex得到
  disc: {},
  topList: {},
  searchHistory: loadSearch(), // 搜索历史
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
