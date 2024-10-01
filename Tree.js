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

    // deleteValue(value)
    // {
    //   let root = this.root
    //   let forwardNode = null
    //   if(value > root.data) forwardNode = root.right
    //   else forwardNode = root.left

    //   while(forwardNode.data != value)
    //   {
    //     root = forwardNode
    //     if(value > root.data) forwardNode = root.right
    //     else forwardNode = root.left
    //   }

    //   if(forwardNode.left == null && forwardNode.right == null) {
    //     if(forwardNode.data > root.value) root.right = null
    //     else root.left = null
    //   }else if ((forwardNode.left != null && forwardNode.right == null) || (forwardNode.left == null && forwardNode.right != null))
    //   {
    //     if(forwardNode.left == null)
    //     {
    //       if(forwardNode.data > root.data) root.right = forwardNode.right
    //       else root.left = forwardNode.right
    //     }else if(forwardNode.right == null)
    //     {
    //       if(forwardNode.data > root.data) root.right = forwardNode.left
    //       else root.left = forwardNode.left
    //     }
    //   }else if(forwardNode.left != null && forwardNode.right != null)
    //   {
    //     let movingNode = forwardNode.right
    //     let smallValue = movingNode
    //     while(movingNode.left != null){
    //       smallValue = movingNode
    //       movingNode = movingNode.left
    //     }
    //     if(smallValue !== null)
    //     {
    //       smallValue.left = movingNode.right
    //     }else{
    //       forwardNode.right = movingNode.right 
    //     }
    //     forwardNode.data = smallValue.data
    //   }
    // }

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
    
          let p = null // right subtree
          let temp = curr.right // to take right children of smallest value
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



let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
test.insert(32)
test.insert(22)
prettyPrint(test.root)
console.log("-------------------------------")
test.deleteValue(67)
prettyPrint(test.root)
