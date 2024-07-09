import React from 'react'
import { observer } from 'mobx-react-lite'
import postStore from '../store/postStore';

const PostContent = () => {
  return (
    <div>{postStore.selectedPost?.title}</div>
  )
}

export default observer(PostContent);