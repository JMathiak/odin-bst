import { Node } from "./Node.js";

class Tree{
    constructor(arr){
        arr = [...new Set(arr)]
        this.data = arr.sort((a,b) => a - b)
        this.root = this.buildTree(this.data)

    }

    buildTree(arr){
        if(arr.length <= 1) return null;

        let mid = Math.floor(arr.length / 2)
        let root = new Node(arr[mid])
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
        else root = root.left 
      }

      return root
      
    }

    levelOrder(callback){
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


let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.insert(32)
test.insert(22)
prettyPrint(test.root)
console.log("-------------------------------")
test.deleteValue(67)
prettyPrint(test.root)
console.log(test.find(8))
test.levelOrder(printNode)
