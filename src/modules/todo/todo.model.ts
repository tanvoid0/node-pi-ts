import {getModelForClass, prop} from "@typegoose/typegoose";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses";

class Todo extends TimeStamps {
    @prop()
    public title: string;

    @prop()
    public description?: string;

    @prop({default: false})
    public completed: boolean;
}

const TodoModel = getModelForClass(Todo);

export default TodoModel;