const Todo = require('../Model/todoSchema');


const createTodo = async (req,res)=>{
    const {title,description} = req.body;

    const user = req.user;
    try {

        const newTodo = await Todo({
            title,description,createdBy:user
        });


        await newTodo.save()
return res.status(200).json({message:"Todo created successfully !",success:true,newTodo});

    } catch (error) {
        
    }
}



const deleteTodo = async (req,res)=>{
    const id = req.params.id ;

    try {
        const todo = await Todo.findById(id);

        if(!todo) return res.status(404).json({message:"Todo not found !",success:false});

        await Todo.findByIdAndDelete(id);

        return res.status(410).json({message:"Deleted Successfully !",success:true,todo});



    } catch (error) {

        console.log(error);
        res.status(400).json({message:"Error in Delete todo !",success:false});
        
    }
}


const getByCreator = async (req,res)=>{
    const createdBy = req.user;

    try {
        
        const todos = await Todo.find({createdBy});
        if(!todos) return res.status(404).json({message:"Not found !",success:true});
        return res.status(200).json({message:"All todos of ${id} :",success:true,todos});
    } catch (error) {

        console.log(error);
        return res.status(400).json({message:"Error is getting todos !",message:true});
        
    }
}


const todoUpdate = async (req,res) =>{
    
    const id = req.params.id;
    const {title,description} = req.body;

    try {
        const todo = await Todo.findById(id);

        if(!todo) return res.status(400).json({message:"Todo not found !",success:false});

        const newTodo = await Todo.findByIdAndUpdate(id,{
            title,description

        },{new:true});
      return res.status(200).json({message:"Updated Successfully !",success:true,newTodo})

    } catch (error) {

        console.log(error);
        res.json({message:"Error in update todo ",success:false});
        
    }

}


module.exports = {getByCreator,deleteTodo,createTodo}

