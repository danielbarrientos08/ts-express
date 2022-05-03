import { Request, Response } from 'express';
import User from '../models/user.model';

export const getUsers = async (req: Request, res: Response) => {

  const users = await User.findAll();

  res.json({
    users
  });
};

export const getUser = async(req: Request, res: Response) => {
  const { id } = req.params;
  const user = await User.findByPk(id)

  if(!user) {
    res.status(404).json({
      msg:'User not found'
    });
  }
  res.json({
   user
  });
};

export const postUser = async(req: Request, res: Response) => {
  const { body } = req;
  
  try {
    const existsEmail = await User.findOne({
      where: {
        email:body.email
      }
    });

    if (existsEmail) {
      return res.status(400).json({
        msg: `the ${body.email} is already in use`
      });
    }

    const user = new User(body);
    await user.save();
    res.json({
      user
    });
  } catch (error) {
    res.status(500).json({
      msg: 'unhandled error (500)'
    });
  }
  
};

export const putUser = async(req: Request, res: Response) => {
  const { body } = req;
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if(!user) {
      return res.status(404).json({
        msg:'User not found'
      });
    }
        
    await user.update(body);

    return res.json({
      user
    });
  } catch (error) {
    res.status(500).json({
      msg: 'unhandled error (500)'
    });
  }
};
export const deleteUser = async(req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if(!user) {
      return res.status(404).json({
        msg:'User not found'
      });
    }

    await user.update({status:false});
    // await user.destroy();
    res.json({
      msg: 'user deleted',
     
    });
  } catch (error) {
    res.status(500).json({
      msg: 'unhandled error (500)'
    });
  }
 
};
