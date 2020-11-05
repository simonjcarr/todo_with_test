import { shallowMount } from "@vue/test-utils"
import "@testing-library/jest-dom"
import ToDoCreate from "@/components/ToDoCreate.vue"

describe("ToDoCreate.vue", () => {
  
  it("Contains a text input field", () => {
    const wrapper = shallowMount(ToDoCreate);
    expect(wrapper.find("input").element).toBeVisible()
  })
  it("When enter is pressed. Text field is cleared", async () => {
    const wrapper = shallowMount(ToDoCreate);
    const taskInput = wrapper.find("[data-unit='taskInput']")
    await taskInput.setValue('A New Task')
    expect(taskInput.element.value).toBe("A New Task")
    await taskInput.trigger('keyup.enter')
    expect(taskInput.element.value).toBe("")
  })
})