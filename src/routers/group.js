/**
 * 圈子路由模块
 */
import GroupHome from "@/page/group/GroupHome.vue";
import GroupList from "@/page/group/GroupList.vue";
import GroupsForUser from "@/page/group/GroupsForUser.vue";
import GroupDetail from "@/page/group/GroupDetail.vue";
import GroupsPostDetail from "@/page/group/GroupPostDetail.vue";
import GroupCreate from "@/page/group/GroupCreate.vue";
import GroupSearch from "@/page/group/GroupSearch.vue";
import SearchPost from "@/page/group/SearchPost.vue";
import likes from "@/page/article/ArticleLikes.vue";
import rewards from "@/page/article/ArticleRewards.vue";

export default [
  {
    path: "/group",
    component: GroupHome,
    meta: {
      title: "圈子首页",
      keepAlive: true,
      requiresAuth: true
    }
  },
  {
    name: "groups",
    path: "/groups",
    component: GroupList,
    meta: {
      title: "全部圈子",
      requiresAuth: true
    }
  },
  {
    name: "groupSearch",
    path: "/group/search",
    component: GroupSearch,
    meta: {
      title: "搜索",
      requiresAuth: true
    }
  },
  {
    name: "groupCreate",
    path: "/group/create",
    component: GroupCreate,
    meta: {
      title: "创建圈子",
      requiresAuth: true
    }
  },
  {
    name: "groupsDetail",
    path: "/groups/:groupID(\\d+)",
    component: GroupDetail,
    meta: {
      title: "圈子详情",
      keepAlive: true,
      requiresAuth: true
    }
  },
  {
    path: "/users/:userID(\\d+)/group",
    component: GroupsForUser,
    meta: {
      title: "TA的圈子",
      // keepAlive: true,
      requiresAuth: true
    }
  },
  {
    path: "/groups/:groupID(\\d+)/posts/:postID(\\d+)",
    component: GroupsPostDetail,
    meta: {
      title: "帖子详情",
      keepAlive: true,
      requiresAuth: true
    }
  },
  {
    name: "groupSearchPost",
    path: "/groups/:groupId(\\d+)/search",
    component: SearchPost,
    meta: {
      title: "搜索帖子",
      requiresAuth: true
    }
  },

  /**
   * 点赞列表 && 打赏列表 路由格式固定
   * 帖子/资讯/问答 相关路由 统一使用 article 代替 id
   * 通过传递 不同的 meta[type] 实现组件复用
   * copy by @/routers/feed.js
   */
  {
    path: "/groups/:groupID(\\d+)/posts/:article(\\d+)/likers",
    component: likes,
    meta: {
      title: "点赞列表",
      type: "post"
    }
  },
  {
    path: "/groups/:groupID(\\d+)/posts/:article(\\d+)/rewarders",
    component: rewards,
    meta: {
      title: "打赏列表",
      type: "post"
    }
  }
];
