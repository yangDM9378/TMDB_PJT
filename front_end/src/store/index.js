import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";
import router from '@/router'


Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins:[
    createPersistedState(),
  ],
  state: {
    movies:[],
    movie:{},
    token:null,
    genres_movie:null,
    comment:[],
    nickname:null,
    ismymoive:null,
    myclick:[],
  },
  getters: {
    // 로그인
    isLogin(state) {
      return state.token ? true : false
    },
    myclick(state) {
      return state.myclick
    }
  },
  mutations: {
    GET_MAIN(state, movies) {
      state.movies = movies
    },
    CLICK_MOVIE(state, movie) {
      state.movie = movie
    },
    GETCOMMENT(state, comment) {
      state.comment = comment
    },
    // 로그인
    SIGNUP_TOKEN() {
      router.push({ name: 'LogInView' })
    },
    LOGIN_TOKEN(state, token) {
      state.token = token
      state.myclick=[]
      router.push({ name: 'MainView' })
    },
    LOGOUT(state) {
      state.token = null
      state.nickname = null
      state.myclick=[]
      router.push({ name: 'LogInView' })
    },
    GETME(state, res) {
      state.nickname = res.data.nick_name
    },
    MYMOVIE(state, tf) {
      state.ismymoive=tf
    }
  },
  actions: {
    getMain(context) {
      axios({
        method: 'get',
        url: `${API_URL}/backend/main/`,
      })
      .then((res) => {
        context.commit('GET_MAIN',res.data)
        
      })
      .catch((err) => {
        console.log(err)
      })
    },
    clickMovie(context, movie) {
      context.commit('CLICK_MOVIE', movie)
    },
    getComment(context) {
      axios({
       method: 'get',
       url: `${API_URL}/backend/comments/`
    })
      .then((res) => {
        context.commit('GETCOMMENT', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    
    // 유저정보
    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
          nick_name: payload.nick_name,
        }
      })
        .then(() => {
          context.commit('SIGNUP_TOKEN')
        })
        .catch(() => {
          alert('아이디/비번을 확인해주세요')
        })
    },
    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((res) => {
          context.commit('LOGIN_TOKEN', res.data.key)
          context.dispatch('getMe', res.data.key)
        })
        .catch(() => {
          alert('아이디/비번을 확인해주세요')
        })
    },
    logOut(context) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/logout/`
      })
      .then((res) => {
        console.log(res)
        context.commit('LOGOUT')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getMe(context, key) {
      axios({
        method:'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${key}`
        }
      })
      .then((res) => {
        console.log(res)
        context.commit('GETME', res)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    myMovie(context, movie_id) {
      axios({
        method:'post',
        url: `${API_URL}/auth/${movie_id}/movie`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
      .then((res) => {
        context.commit('MYMOVIE', res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    ourclick(context, id) {
      axios({
        method:'post',
        url: `${API_URL}/backend/movies/${id}/cnt/`,
      })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  modules: {
  }
})
