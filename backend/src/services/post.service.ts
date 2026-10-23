import * as postRepository from "../repositories/post.repository.js";

export async function listPosts() {
  return postRepository.findAllPosts();
}

export async function getPost(id: number) {
  return postRepository.findPostById(id);
}

export async function createPost(
  authorId: number,
  title: string,
  description: string | null,
  image: string | null
) {
  return postRepository.insertPost(authorId, title, description, image);
}

export async function updatePost(
  id: number,
  authorId: number,
  title: string | undefined,
  description: string | null | undefined,
  image: string | null | undefined
) {
  return postRepository.updatePostById(
    id,
    authorId,
    title,
    description,
    image
  );
}

export async function deletePost(id: number, authorId: number) {
  return postRepository.deletePostById(id, authorId);
}

