import { useEffect, useState, useRef } from "react";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from '../hooks/useFetching';

import PostService from '../API/PostService';

import { getPageCount } from "../utils/pages";

import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from '../components/PostFilter';

import MyButton from "../components/UI/button/MyButton";
import MyModal from '../components/UI/MyModal/MyModal';
import Loader from "../components/UI/Loader/Loader";
import Pagination from '../components/UI/pagination/Pagination';
import { useObserver } from '../hooks/useObserver';


function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const lastElement = useRef();

  const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  // Получаем post из дочернего компонента
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  }

  return (
    <div className="app">
      <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>Создать пользователя</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchPosts}
        key={posts.id}
        title="Посты про Javascript"
      />
      <div ref={lastElement} style={{ height: 20, backgroundColor: "red" }}></div>
      {isPostsLoading &&
        <div style={{ display: "flex", justifyContent: "center", marginTop: 50 }}><Loader /></div>
      }
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div >
  );
}

export default Posts;