import { Node } from "./Node.js";

class Tree{
    constructor(arr){
        this.arr = [...new Set(arr)]
        this.data = this.arr.sort((a,b) => a - b)
        this.root = null

    }

    buildTree(arr){
        if(arr.length <= 1) return null;

        let mid = Math.floor(arr.length / 2)
        let root = new Node(arr[mid])
        if(this.root == null) this.root = root
        root.left = this.buildTree(arr.slice(0, mid))
        root.right = this.buildTree(arr.slice(mid))

        return root;
    }

    // insert(root, value)
    // {
    
    //   if(root === null) return new Node(value)
        
    //   if(root.data === value) return root
    //   if(value < root.data)
    //   {
    //    root.left = this.insert(root.left, value)
    //   }else if(value > root.data)
    //   {
    //     root.right = this.insert(root.right, value)
    //   }

    //   return root
     
    // }

    insert(value)
    {
      let root = this.root
      let holder = null
      if(root == null)
      {
        this.root = new Node(value)
      }

      while(root != null)
      {
        holder = root
        if(value > holder.data)
        {
          root = root.right
        }else{
          root = root.left
        }
      }

      if(value < holder.data)
      {
        holder.left = new Node(value)
      }else if(value > holder.data)
      {
        holder.right = new Node(value)
      }

    }


    deleteValue(value){
      let curr = this.root
      let prev = null

      while(curr.data != value && curr != null)
      {
        prev = curr
        if(value > curr.data)
        {
          curr = curr.right
        }else{
          curr = curr.left
        }
      }

      if(curr == null)
      {
        return
      }

      //if the node to be deleted is a leaf
      if(curr.left == null && curr.right == null)
      {
        if(prev.right == curr)
        {
          prev.right = null
        }else prev.left = null
      }else if(curr.left === null || curr.right === null) // One child case
      {
       if(prev.left == curr)
       {
        if(curr.left != null) prev.left = curr.left
        else if(curr.right != null) prev.left = curr.right
       }else if(prev.right == curr){
        if(curr.left != null) prev.right = curr.left
        else if(curr.right != null) prev.right = curr.right
       }
      }else // Two child case
      {
    
          let p = null 
          let temp = curr.right // right subtree
          while(temp.left !== null) //traverse  down right subtree always going less
          {
            p = temp// store node before going to next
            temp = temp.left
          }
          if(p !== null) p.left = temp.right
          else curr.right = temp.right
          
          curr.data = temp.data

      }

    }

    find(value)
    {
      let root = this.root
      while(root.data != value)
      {
        if(value > root.data)  root = root.right
        else if(value < root.data) root = root.left 
        else if(root.left == null && root.right == null && root.data != value) return null
      }

      return root
      
    }

    levelOrder(callback){

      if(typeof(callback) !== "function")
      {
        throw new Error("Parameter is not a function")
      }
      // shift removes first element from array
      let queue = []
      queue.push(this.root)
      while(queue.length != 0)
      {
        let working = queue.shift()
        if(working.left !== null)
        {
          queue.push(working.left)
        }

        if(working.right != null) queue.push(working.right)

        callback(working)
      }

    }

    inOrder(callback)
    {
      if(typeof(callback) !== 'function'){
        throw new Error("Parameter is not a function")
      }
      if(this.root == null) return
      let stack = []
      // shift removes first element
      // unshift puts element at the beginning of array

      
      let current = this.root
      
      while(stack.length || current != null)
      {
  
        if(current != null)
        {
          stack.unshift(current)
          current = current.left
        }else{
          let pop = stack.shift()
          callback(pop)
          current = pop.right
        }
      
      }
    }

    preOrder(callback){
      if(typeof(callback) !== 'function'){
        throw new Error("Parameter is not a function")
      }

      let stack = []
      stack.unshift(this.root)
      while(stack.length)
      {
        let pop = stack.shift()
        callback(pop)
        if(pop.right != null) stack.unshift(pop.right)
        if(pop.left != null) stack.unshift(pop.left)
      }

    }

    postOrder(callback){
      if(typeof(callback) !== 'function'){
        throw new Error("Parameter is not a function")
      }
      let firstStack = []
      let secondStack = []
      //LIFO
      // shift removes first element
      // unshift puts element at the beginning of array
      firstStack.push(this.root)
      while(firstStack.length > 0)
      {
        let pop = firstStack.pop()
        secondStack.push(pop)
        if(pop.left != null) firstStack.push(pop.left)
        if(pop.right != null) firstStack.push(pop.right)
      }

      while(secondStack.length > 0)
      {
        let pop = secondStack.pop()
        callback(pop)
      }
    }

    depth(val)
    {
      let root = this.root
      let depth = 0
      if(val == root.data) return 0
      while(root.data != val)
      {
        if(val > root.data)  
          {
            root = root.right
            depth++
          }
        else {
          root = root.left 
          depth++
        }
      }
     return depth
    }

    height(val)
    {
      let height = 0
      let node = this.find(val)
      if(node != null)
      {
        height = this.heightHelper(node)
      }
      return height
    }

    heightHelper(node)
    {
      if(node == null) return -1
      let leftHeight = this.heightHelper(node.left)
      let rightHeight = this.heightHelper(node.right)
      return Math.max(leftHeight, rightHeight) + 1
    }


    isBalanced(root){

      if (root == null)
        return 0;
    let lh = this.isBalanced(root.left);
    if (lh == -1)
        return -1;
    let rh = this.isBalanced(root.right);
    if (rh == -1)
        return -1;

    if (Math.abs(lh - rh) > 1)
        return -1;
    else
        return Math.max(lh, rh) + 1;
    }

    rebalance(){
      this.inOrder(addNode)
      this.data = newArr.sort((a,b) => a - b)
      this.root = this.buildTree(this.data)


    }

    
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const printNode = (node) => {
    console.log(node.data)
  }

  const addNode = (node) =>{
    newArr.push(node.data)
  }
 

  
let newArr = []
let buildArr = []
for(let i = 0; i < 15; i++)
  {
    buildArr.push(Math.floor(Math.random() * 100))
  }
let test = new Tree(buildArr)
test.buildTree(test.data)
prettyPrint(test.root)
console.log(test.root)
if(test.isBalanced(test.root) > 0)
  console.log('Tree is balanced')
else console.log("Tree is Not Balanced")
console.log("---- In Order ----")
test.inOrder(printNode)
console.log("---- Pre Order ----")
test.preOrder(printNode)
console.log("---- Post Order ----")
test.postOrder(printNode)
console.log("---- Level Order ----")
test.levelOrder(printNode)
for(let i = 0; i < 10; i++)
{
  test.insert(Math.floor(Math.random() * 1000) + 100)
}
prettyPrint(test.root)
if(test.isBalanced(test.root) > 0)
  console.log('Tree is balanced')
else console.log("Tree is Not Balanced")
test.rebalance()
prettyPrint(test.root)
if(test.isBalanced(test.root) > 0)
  console.log('Tree is balanced')
else console.log("Tree is Not Balanced")
console.log("---- In Order ----")
test.inOrder(printNode)
console.log("---- Pre Order ----")
test.preOrder(printNode)
console.log("---- Post Order ----")
test.postOrder(printNode)
console.log("---- Level Order ----")
test.levelOrder(printNode)



/*
stack -> 3 4 8
pop 3 -> no sub tree
stack -> 4 8
pop 4

*/