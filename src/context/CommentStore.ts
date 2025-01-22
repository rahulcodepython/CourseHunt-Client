import { CommentStoreActions, CommentStoreState, DetailBlogsCommentType } from '@/types';
import { create } from 'zustand';

export const useCommentStore = create<CommentStoreState & CommentStoreActions>((set) => ({
    comments: [],
    totalComments: 0,

    setComments: (comments) => set({ comments }),
    setTotalComments: (totalComments) => set({ totalComments }),

    createComment: (content: DetailBlogsCommentType) => {
        set((state) => ({
            comments: [...state.comments, content],
            totalComments: state.totalComments + 1,
        }));
    },

    createReply: (parent: string, content: DetailBlogsCommentType) => {
        set((state) => ({
            comments: state.comments.map((item) => {
                if (item.id === parent) {
                    return {
                        ...item,
                        children: [...item.children, content],
                    };
                }
                return item;
            }),
            totalComments: state.totalComments + 1,
        }));
    },

    deleteComment: (parent: string) => {
        set((state) => ({
            comments: state.comments.filter((item) => item.id !== parent),
            totalComments: state.totalComments - 1,
        }));
    },

    deleteReply: (parent: string, child: string) => {
        set((state) => ({
            comments: state.comments.map((item) => {
                if (item.id === parent) {
                    return {
                        ...item,
                        children: item.children.filter((i) => i.id !== child),
                    };
                }
                return item;
            }),
            totalComments: state.totalComments - 1,
        }));
    },

    editComment: (parent: string, content: string) => {
        set((state) => ({
            comments: state.comments.map((item) => {
                if (item.id === parent) {

                    return {
                        ...item,
                        content,
                    };
                }
                return item;
            }),
        }));
    },

    editReply: (parent: string, child: string, content: string) => {
        set((state) => ({
            comments: state.comments.map(item => {
                if (item.id === parent) {
                    return {
                        ...item,
                        children: item.children.map(i => {
                            if (i.id === child) {
                                return {
                                    ...i,
                                    content
                                }
                            }
                            return i
                        })
                    }
                }
                return item
            })
        }))
    },
}))