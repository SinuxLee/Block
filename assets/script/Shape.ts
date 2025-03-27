import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;
import {BlockColor} from './Block'

@ccclass('Shape')
export default class Shape extends Component {
    /**
     * 初始化方块形状
     * @param type 形状类型（0-6）
     */
    public init(type: number,color: BlockColor): void {
    }
}