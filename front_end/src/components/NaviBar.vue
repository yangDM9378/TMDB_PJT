<template>
  <div>
    <div class="acontainer">
      <nav id="navbar">
        <div class="link1" style="text-decoration:none;">
          <div style="margin-left:1.5rem; margin-top: 0.18rem">
          <router-link :to="{ name: 'MainView' }">Main</router-link>  
          <router-link :to="{ name: 'AllGenreView' }">전체</router-link>
          <router-link :to="{ name: 'GenreView', params:{ genre: '드라마' }}">드라마</router-link>
          <router-link :to="{ name: 'GenreView', params:{ genre: '액션' }}">액션</router-link>
          <router-link :to="{ name: 'GenreView', params:{ genre: '코미디' }}">코미디</router-link>
          <router-link :to="{ name: 'GenreView', params:{ genre: '애니메이션' }}">애니메이션</router-link>
          </div> 
        </div>
        <div class="link2">
          <div style="margin-top: 0.18rem">
          <router-link v-if="!isLogin" :to="{ name: 'SignUpView'}">회원가입</router-link> 
          <router-link v-if="!isLogin" :to="{ name: 'LogInView' }">로그인</router-link> 
          <router-link v-if="isLogin" :to="{ name: 'MyPageView' }">마이페이지</router-link> 
          <router-link v-if="isLogin" :to="{ name: 'MainView'}">
            <button class="logout_btn" @click="logOut">로그아웃</button>
          </router-link>
        </div>
        </div> 
      </nav>
    </div>
  </div>
</template>


<script>
export default {
  name: 'NaviBar',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    nickname() {
      return this.$store.state.nickname
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    },
  }
}


</script>


<style>

#navbar {
  display: flex;
  opacity: 0.6;
  position: fixed;
  background: #000001;
  right: 0;
  left: 0;
  width: 100%;
  height: 6%;
  display: table;
  margin: 0;
  z-index:2;
  transition: all 300ms ease-in-out;
}


#navbar a {
  text-decoration: none;
  font-size: 15px;
  margin:1rem;
}

.logout_btn {
    margin-right: 20px;
    justify-content: center;
    font-size: 15px;
    font-weight: bold;
    color: #e8e8ee;
    text-decoration: none;
    background-color:transparent;
}
.logout_btn:hover {
  color: #497fe2;
}

.logout_btn:active {
  color: #9090ee;
}


.link1{
  float: left;
  display: inline-block;
  cursor: pointer;
  margin: 0px;
  padding: 0px;

}
.link2{
  float: right;
  display: inline-block;
  cursor: pointer;
  padding: 0px;
  margin-right:1.3rem
}
</style>

