import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import App from '@/App.vue';
import VueRouter from 'vue-router';
import UserRegister from '@/components/user/UserRegister.vue';
import { userRoutes as routes } from '@/router/UserRoutes.js';
import { routes as baseRoutes } from '@/router/index.js';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('App', () => {
  it('라우팅 모듈이 정상으로 되는가', async () => {
    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes,
    });
    const wrapper = mount(App, {
      localVue,
      router,
    });
    router.push('/registerUser').catch(() => {});

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UserRegister).exists()).toBe(true);
  });

  it('전체 routing이 제대로 되는가', async () => {
    const router = new VueRouter({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: baseRoutes,
    });
    const wrapper = mount(App, {
      localVue,
      router,
    });
    router.push('/registerUser').catch(() => {}); // 에러 관련 https://stackoverflow.com/questions/62462276/how-to-solve-avoided-redundant-navigation-to-current-location-error-in-vue

    await wrapper.vm.$nextTick();
    expect(wrapper.findComponent(UserRegister).exists()).toBe(true);
  });

  it.skip('mock routing path', () => {
    // index의 routes 불러오면 작동이 안됨
    const $route = {
      path: '/some/path',
    };
    const wrapper = shallowMount(UserRegister, {
      mocks: {
        $route,
      },
    });

    expect(wrapper.vm.$route.path).toEqual('/some/path');
  });

  it.skip('renders id param', () => {
    const msg = '유저 등록 화면';
    const wrapper = shallowMount(UserRegister, {
      mocks: {
        $route: {
          params: {
            msg: msg,
          },
        },
      },
    });
    expect(wrapper.text()).toContain(msg);
  });
});
