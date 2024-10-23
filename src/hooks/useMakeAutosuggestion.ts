import { chatCompletion } from '@/api/chatApi'
import { ElMessage } from 'element-plus'
import { useChatStore } from '@/stores'
import { toValue } from 'vue'
import type { Ref } from 'vue'

const defaultModelOptions: ModelOptions = {
  stream: false,
  temperature: 0.9,
  top_p: 1,
  max_tokens: 2048,
  presence_penalty: 0,
  frequency_penalty: 0,
}
export const useMakeAutosuggestion = (
  modelOptions: Ref<ModelOptions>,
  scrollFn?: () => void,
) => {
  const chatStore = useChatStore()
  // 组装参数
  const makeRequestData = (
    model: string,
    message: Message,
  ): CompletionRequest | null => {
    if (!model) {
      ElMessage.error('请选择模型')
      return null
    }
    chatStore.addMessage(message)
    scrollFn && scrollFn()
    return {
      ...defaultModelOptions,
      ...toValue(modelOptions),
      model,
      messages: chatStore.messages,
    }
  }

  const makeAutosuggestion = async (model: string, message: Message) => {
    const requestData = makeRequestData(model, message)
    if (!requestData) return
    try {
      const response = await chatCompletion(requestData)
      response.choices.forEach(choice => {
        chatStore.addMessage(choice.message)
      })
      scrollFn && scrollFn()
      return response
    } catch (error) {
      console.error('Error during chatCompletion:', error)
      ElMessage.error('生成建议失败')
    }
  }

  return {
    makeAutosuggestion,
  }
}
