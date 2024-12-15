import { useEffect } from 'react';
import Phaser from 'phaser';

const Game = () => {
  useEffect(() => {
    let player;
    let obstacles;
    let cursors;

    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      scene: {
        preload: preload,
        create: create,
        update: update
      },
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },  // 重力を設定（落下する）
          debug: false
        }
      }
    };

    const game = new Phaser.Game(config);

    function preload() {
      this.load.image('player', '/images/player.png');
      this.load.image('obstacle', '/images/obstacle.png');
    }

    function create() {
      player = this.physics.add.sprite(100, 450, 'player');
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);

      // キーボードの入力を取得
      cursors = this.input.keyboard.createCursorKeys();  // 矢印キー

      // 障害物のグループ作成
      obstacles = this.physics.add.group({
        key: 'obstacle',
        repeat: 5,  // 5個の障害物を作成
        setXY: { x: 400, y: 0, stepX: 100 }
      });

      this.physics.add.collider(player, obstacles, hitObstacle, null, this);
    }

    function update() {
      // プレイヤーの左右移動
      if (cursors.left.isDown) {
        player.setVelocityX(-160);  // 左に移動
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);   // 右に移動
      } else {
        player.setVelocityX(0);     // 動かない
      }

      // スペースキーでジャンプ
      if (cursors.up.isDown && player.body.onFloor()) {  // プレイヤーが地面にいるとき
        player.setVelocityY(-330);  // ジャンプ
      }

      // 障害物の動き（プレイヤーを追いかける）
      obstacles.children.iterate((obstacle) => {
        // 障害物のx座標をプレイヤーに向かって移動させる
        if (obstacle.x > player.x) {
          obstacle.x -= 1;  // プレイヤーを追いかける
        } else if (obstacle.x < player.x) {
          obstacle.x += 1;  // プレイヤーを追いかける
        }

        // 障害物がy座標で落ちる
        obstacle.y += 3;  // y座標を下に移動

        // 障害物が画面外に出た場合
        if (obstacle.y > 600) {  // 画面下に到達した場合
          obstacle.y = -Phaser.Math.Between(50, 150);  // 上部に戻す（ランダムな位置）
          obstacle.x = Phaser.Math.Between(800, 1000);  // ランダムなx位置に設定
        }
      });
    }

    function hitObstacle(player, obstacle) {
      console.log('Game Over!');
    }

    return () => {
      game.destroy(true); // ゲームインスタンスのクリーンアップ
    };
  }, []);

  return (
    <div id="game-container" style={{ width: '800px', height: '600px' }}></div>
  );
};

export default Game;
