import { createSlice } from '@reduxjs/toolkit';
import { taskInterface } from './task.interface'
import { taskState } from './taskState';

export const taskSlice = createSlice({
    name: "task",

    initialState: taskState as taskInterface[],

    reducers: {
        doneTask: (state: taskInterface[], action: any) => {
            return state.map(item => {
                if(item.id === action.payload) {
                    console.log("done", action.payload);                   //return id

                    return {
                        ...item,
                        done: true
                    }
                }
                
                return item;
            })
        },

        pinnedOrUnpinnedTask: (state: taskInterface[], action: any) => {
            return state.map(item => {
                if(item.id === action.payload) {
                    (item.pinned) ? console.log("unpinned", action.payload) : console.log("pinned", action.payload)

                    return {
                        ...item,
                        pinned: !item.pinned
                    }
                }
                
                return item;
            })
        },

        deleteTask: (state: taskInterface[], action: any) => {
            console.log("delete", action.payload);                         //return id

            return state.filter((item) => item.id !== action.payload);
        },

        addTask: (state: taskInterface[], action: any) => {
            state.push({
                id     : state.length + 1,
                title  : action.payload,                                   //return title
                done   : false,
                pinned : false
            })
        }
    },
})

export const { addTask, doneTask, pinnedOrUnpinnedTask, deleteTask } = taskSlice.actions;
export const selectTask = (state) => state.taskSliceReducer;
export default taskSlice.reducer;