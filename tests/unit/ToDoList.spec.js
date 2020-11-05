import { mount, shallowMount } from "@vue/test-utils"
import '@testing-library/jest-dom';
import ToDoCreate from '@/components/ToDoCreate.vue';
import ToDoList from '@/components/ToDoList.vue'
import Vue from 'vue'

describe("ToDoList.vue", () => {
  
  it("Contains the ToDoCreate component", () => {
    const wrapper = mount(ToDoList)
    expect(wrapper.findComponent(ToDoCreate).exists()).toBe(true)
  })

  it("Contains no tasks", () => {
    const wrapper = shallowMount(ToDoList)
    expect(wrapper.findAll(".task-row").length).toBe(0)
  })

  it("ToDoCreate component emits a task upon keyup.enter", async () => {
    const wrapper = mount(ToDoList)
    const taskInput = wrapper.findComponent(ToDoCreate).find("[data-unit='taskInput']")
    await taskInput.setValue("Buy Milk")
    await taskInput.trigger("keyup.enter")
    expect(wrapper.findComponent(ToDoCreate).emitted().task).toBeTruthy()
    expect(wrapper.findAll(".task-row").length).toBe(1)
  })

  it("Marks a task complete when I click the task checkbox", async () => {
    const wrapper = mount(ToDoList)
    const taskInput = wrapper.findComponent(ToDoCreate).find("[data-unit='taskInput']")
    await taskInput.setValue("Buy Milk")
    await taskInput.trigger("keyup.enter")
    expect(wrapper.vm.$data.tasks[0].complete).toBe(false)
    expect(wrapper.findAll('.complete').length).toBe(0);
    await wrapper.find("[data-unit='task-checkbox-0']").trigger("click")
    expect(wrapper.vm.$data.tasks[0].complete).toBe(true);
    expect(wrapper.findAll(".complete").length).toBe(1)
  })

  it ("Deletes task when the delete button is pressed", async () => {
    const wrapper = mount(ToDoList)
    const taskInput = wrapper.findComponent(ToDoCreate).find("[data-unit='taskInput']")
    await taskInput.setValue("Buy Milk")
    await taskInput.trigger("keyup.enter")
    
    expect(wrapper.findAll(".task-row").length).toBe(1);
    const button = wrapper.find("[data-unit='btn-0']")
    await button.trigger("click")
    expect(wrapper.findAll('.task-row').length).toBe(0);
  })

  it("Updates task count status", async () => {
    const wrapper = mount(ToDoList)
    const taskInput = wrapper.findComponent(ToDoCreate).find("[data-unit='taskInput']")
    await taskInput.setValue("Buy Milk")
    await taskInput.trigger("keyup.enter")
    expect(wrapper.find(".total-tasks").text()).toContain("1")
    await wrapper.find("[data-unit='task-checkbox-0']").trigger('click');
    expect(wrapper.find(".completed-tasks").text()).toContain("1")
    await wrapper.find("[data-unit='btn-0']").trigger("click")
    expect(wrapper.find('.total-tasks').text()).toContain('0');
    expect(wrapper.find('.completed-tasks').text()).toContain('0');
  })

  it("Shows no tasks message when the task list is empty. It should not be visible when there are tasks in the list", async () => {
    const wrapper = mount(ToDoList)
    const taskInput = wrapper.find("[data-unit='taskInput']")
    expect(wrapper.find(".no-todo-message").text()).toBe("You have no tasks")
    await taskInput.setValue("Buy Milk")
    await taskInput.trigger("keyup.enter")
    expect(wrapper.vm.$data.tasks.length).toBe(1)
    expect(wrapper.findAll(".no-todo-message").length).toBe(0)
  })
})
