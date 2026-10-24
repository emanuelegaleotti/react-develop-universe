import {createSelector} from "@reduxjs/toolkit";
import {ChatState} from "./chat-slice.ts";
import {MessageView} from "../models/message-view.ts";
import { KBInformation } from '../models/knowledge-information.ts'


export const selectChatState = (state: any): ChatState => state.chatState
export const selectMessages = (chatId: string) => createSelector(
    selectChatState,
    (state: ChatState): MessageView[] => state.chats[chatId]?.messages ?? []
)
export const selectMessageAction = (chatId: string) => createSelector(
    selectChatState,
    (state: ChatState): string | undefined => state.chats[chatId]?.messageActionId
)
export const selectMessageLikeId = (chatId: string) => createSelector(
    selectChatState,
    (state: ChatState): string | undefined => state.chats[chatId]?.messageLikeId
)
export const selectMessageLike = (chatId: string) => createSelector(
    selectChatState,
    (state: ChatState): string | undefined => state.chats[chatId]?.messageLike
)
export const selectMessageDislikeId = (chatId: string) => createSelector(
    selectChatState,
    (state: ChatState): string | undefined => state.chats[chatId]?.messageDislikeId
)
export const selectMessageDislike = (chatId: string) => createSelector(
    selectChatState,
    (state: ChatState): string | undefined => state.chats[chatId]?.messageDislike
)
export const selectMessage = (chatId: string) => createSelector(
    selectChatState,
    (state: ChatState): string | undefined => state.chats[chatId]?.message
)
export const selectSelectedKnowledgeBase = (chatId: string) => createSelector(
    selectChatState,
    (state: ChatState): string[] => state.chats[chatId]?.selectedKnowledgeBase ?? []
)
export const selectKnowledgeBase = createSelector(
    selectChatState,
    (state: ChatState): KBInformation[] => state.knowledgeBase
)
export const selectChatId = createSelector(
    selectChatState,
    (state: ChatState): string => state.selectedChat
)
export const selectIsReceiving = createSelector(
    selectChatState,
    (state: ChatState): boolean => state.isReceiving
)
export const selectTemporaryKnowledgeBase = createSelector(
    selectChatState,
    (state: ChatState): string[] => state.temporaryKnowledgeBases
)
export const selectTemporaryMessage = createSelector(
    selectChatState,
    (state: ChatState): string => state.temporaryMessage
)