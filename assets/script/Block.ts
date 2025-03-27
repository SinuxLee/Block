import { _decorator, Component, Node, Sprite, SpriteFrame, resources } from 'cc';
const { ccclass, property } = _decorator;

export enum BlockColor {
    Blue,
    Green,
    Orange,
    Red,
    Yellow
};

@ccclass('Block')
export default class Block extends Component {
    private _color: BlockColor = BlockColor.Blue;
    private _sprite: Sprite | null = null;
    
    // 颜色对应的资源名称
    private static readonly COLOR_RESOURCES: string[] = [
        'blue',    // Color.Blue
        'green',   // Color.Green
        'orange',  // Color.Orange
        'red',     // Color.Red
        'yellow'   // Color.Yellow
    ];
    
    // 缓存加载的精灵帧
    private static _spriteFrameCache: Map<string, SpriteFrame> = new Map();
    
    onLoad() {
        this._sprite = this.getComponent(Sprite);
    }
    
    /**
     * 设置方块颜色
     * @param color 颜色枚举值
     */
    public setColor(color: BlockColor) {
        this._color = color;
        this.updateSprite();
    }
    
    /**
     * 获取当前方块颜色
     */
    public getColor(): BlockColor {
        return this._color;
    }
    
    /**
     * 更新精灵显示
     */
    private updateSprite() {
        if (!this._sprite) return;
        
        const resourceName = Block.COLOR_RESOURCES[this._color];
        
        // 检查缓存中是否已有该精灵帧
        if (Block._spriteFrameCache.has(resourceName)) {
            this._sprite.spriteFrame = Block._spriteFrameCache.get(resourceName)!;
        } else {
            // 加载精灵帧
            resources.load(`resource/${resourceName}/spriteFrame`, SpriteFrame, (err, spriteFrame) => {
                if (err) {
                    console.error(`加载精灵帧失败: ${resourceName}`, err);
                    return;
                }
                
                // 缓存并设置精灵帧
                Block._spriteFrameCache.set(resourceName, spriteFrame);
                if (this._sprite) {
                    this._sprite.spriteFrame = spriteFrame;
                }
            });
        }
    }
}
