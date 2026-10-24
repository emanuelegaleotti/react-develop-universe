import {createSlice, Slice} from '@reduxjs/toolkit'
import {MessageView} from '../models/message-view.ts'
import { KBInformation } from '../models/knowledge-information.ts'

export interface ChatState {
  knowledgeBase: KBInformation[],
  selectedChat: string
  isReceiving: boolean
  temporaryKnowledgeBases: string[],
  temporaryMessage: string,
  chats: {
    [key: string]: {
      messages: MessageView[]
      message: string
      selectedKnowledgeBase: string[]
      messageLikeId?: string
      messageLike?: string
      messageDislikeId?: string
      messageDislike?: string
      messageActionId?: string,
    }
  }
}

const initialState: ChatState = {
  knowledgeBase: [],
  selectedChat: '',
  isReceiving: false,
  temporaryKnowledgeBases: [],
  temporaryMessage: '',
  chats: {}
}

export const RduChatSlice: Slice<ChatState> = createSlice({
  name: 'RduChat',
  initialState,
  reducers: {
    initKnowledgeBase: () => {},
    storeKnowledgeBase: (state, action) => {
      state.knowledgeBase = action.payload.knowledgeBase
    },
    clearKnowledgeBase: (state) => {
      state.knowledgeBase = []
    },
    sendTemporaryMessage:()=>{},
    storeTemporaryMessage: (state, action) => {
      state.temporaryMessage = action.payload.messageToSend
    },
    clearTemporaryMessage: (state) => {
      state.temporaryMessage = ''
    },
    storeTemporaryKb: (state, action) => {
      state.temporaryKnowledgeBases = action.payload.knowledgeBases
    },
    addTemporaryKb: (state, action) => {
      state.temporaryKnowledgeBases = [...state.temporaryKnowledgeBases, action.payload.knowledgeBase]
    },
    removeTemporaryKb: (state, action) => {
      state.temporaryKnowledgeBases = [
        ...state.temporaryKnowledgeBases.filter((kb: string) => kb !== action.payload.knowledgeBase)]
    },
    clearTemporaryKb: (state) => {
      state.temporaryKnowledgeBases = []
    },
    storeChat: (state, action) => {
      state.selectedChat = action.payload.chatId
    },
    clearChat: (state) => {
      state.selectedChat = ''
      state.isReceiving = false
    },
    storeIsReceiving: (state) => {
      state.isReceiving = true
    },
    clearIsReceiving: (state) => {
      state.isReceiving = false
    },
    storeMessages: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messages: action.payload.messages
        },
      }
    },
    addMessages: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messages: [...state.chats[action.payload.chatId].messages, action.payload.messages]
        },
      }
    },
    removeMessages: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messages: [...state.chats[action.payload.chatId].messages.filter(m => m.correlationId !== action.payload.streamingId)]
        },
      }
    },
    updateMessages: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messages: [...state.chats[action.payload.chatId].messages.map(m =>
            m.correlationId === action.payload.streamingId ? ({
              ...m,
              content: m.content.concat(action.payload.content)
            }) : m)
          ]
        }
      }
    },
    clearMessages: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.id]: {
          ...state.chats[action.payload.id],
          messages: []
        },
      }
    },
    storeMessage: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          message: action.payload.messageToSend
        },
      }
    },
    clearMessage: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          message: ''
        },
      }
    },
    sendMessage: () => {},
    storeLike: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageLikeId: action.payload.id
        },
      }
    },
    clearLike: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageLikeId: 0
        },
      }
    },
    storeLikeMessage: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageLike: action.payload.message
        },
      }
    },
    clearLikeMessage: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageLike: ''
        },
      }
    },
    storeDislike: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageDislikeId: action.payload.id
        },
      }
    },
    clearDislike: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageDislikeId: 0
        },
      }
    },
    storeDislikeMessage: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageDislike: action.payload.message
        },
      }
    },
    clearDislikeMessage: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageDislike: 0
        },
      }
    },
    storeAction: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageActionId: action.payload.id
        },
      }
    },
    clearAction: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          messageActionId: 0
        },
      }
    },
    storeSelectedKnowledgeBase: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          selectedKnowledgeBase: action.payload.selectedKnowledgeBase
        },
      }
    },
    addSelectedKnowledgeBase: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          selectedKnowledgeBase: [...state.chats[action.payload.chatId].selectedKnowledgeBase, action.payload.knowledgeBase]
        },
      }
    },
    removeSelectedKnowledgeBase: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          selectedKnowledgeBase: [...state.chats[action.payload.chatId].selectedKnowledgeBase.filter(knowledgeBase => knowledgeBase !== action.payload.knowledgeBase)]
        },
      }
    },
    clearSelectedKnowledgeBase: (state, action) => {
      state.chats = {
        ...state.chats,
        [action.payload.chatId]: {
          ...state.chats[action.payload.chatId],
          knowledgeBase: ''
        },
      }
    }
  },
})

export const {
  initKnowledgeBase,
  storeKnowledgeBase,
  clearKnowledgeBase,
  storeChat,
  clearChat,
  storeIsReceiving,
  clearIsReceiving,
  storeMessages,
  clearMessages,
  storeMessage,
  clearMessage,
  sendMessage,
  storeLike,
  clearLike,
  storeLikeMessage,
  clearLikeMessage,
  storeDislike,
  clearDislike,
  storeDislikeMessage,
  clearDislikeMessage,
  storeAction,
  clearAction,
  storeSelectedKnowledgeBase,
  addSelectedKnowledgeBase,
  removeSelectedKnowledgeBase,
  clearSelectedKnowledgeBase,
  addTemporaryKb,
  removeTemporaryKb,
  sendTemporaryMessage,
  storeTemporaryMessage,
  clearTemporaryMessage,
  storeTemporaryKb,
  clearTemporaryKb
} = RduChatSlice.actions

export default RduChatSlice.reducer
